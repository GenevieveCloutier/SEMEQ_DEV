import { fail, redirect } from '@sveltejs/kit';
import { createCookie, findOne } from "../../lib/db/controllers/sessions.controller.js";
import { authenticate, changementMDP, newUser, recuperationMDP } from '../../lib/db/controllers/Utilisateurs.controller.js';
import { deleteUser } from '../../lib/db/controllers/Utilisateurs.controller.js';
import { domaines, emplacements, envoieDomaine, envoieMappage, types, verifs } from '../../lib/outils/compteurBinaire.js';
import { creationEvenement } from '../../lib/db/controllers/Evenements.controller.js';
import { envoieCourriel } from '../../lib/outils/nodeMailer.js';
import { log } from '../../lib/outils/debug.js';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

//Chemins de base pour stocker les photos
const cheminPhotosEven = path.join(process.cwd(), 'src/lib/img/app/evenements'); 
const cheminLogos = path.join(process.cwd(), 'src/lib/img/app/logos');
const cheminPhotosUtilisateurs = path.join(process.cwd(), 'src/lib/img/app/utilisateurs');

export const actions = {

    supprimeUtilisateur: async({ cookies, request })=>{
        const data = await request.formData();
        
        const result = await deleteUser(data.get('id'));
        return result;
        //redirect(302, '/logout');
    },

    connexionUtilisateur: async({ cookies, request })=>{
        const data = await request.formData();
        try {
            let res = await authenticate(data.get("courriel"), data.get("pwd"));
            createCookie(res.id, cookies, res.role_id)
            return { success: true, session: cookies.get("session"), res: res.id}
        }catch(error){
            return fail(401, error);
        }
    },

    //tous les utilisateurs (gratuit, exposant, organisateur à venir) doivent être créés par ici
    nouvelUtilisateur: async({cookies, request})=>{
        const data = await request.formData();
        log("les data = ", data);
        
        const dataEntree = [...data.entries()];
        const role = dataEntree.length == 6 ? '4' : envoieMappage(data, domaines) == 0 ? '2' : '3';
        const finAbo = data.get("abonne") == 'on' ? (new Date(Date.now() + 3.1536e10)) : null;

        const domaine = envoieMappage(data, domaines);

        // Pour uploader et stocker les logos
        const uploadLogo = async (nomFichier) => {
            const logo = data.get(nomFichier);

            if (logo && logo.name) { 
            const buffer = Buffer.from(await logo.arrayBuffer());
            const filePath = path.resolve(cheminLogos, logo.name);
            fs.writeFileSync(filePath, buffer);
            return path.relative(process.cwd(), filePath);
            };
            // Si pas de logo, retourne null
            return null;
        };
        const logo = await uploadLogo('logo');

        // Pour uploader et stocker les photos des utilisateurs
        const uploadPhotoUtilisateur = async (nomFichier) => {
            const photo = data.get(nomFichier);

            if (photo && photo.name) { 
            const buffer = Buffer.from(await photo.arrayBuffer());
            const filePath = path.resolve(cheminPhotosUtilisateurs, photo.name);
            fs.writeFileSync(filePath, buffer);
            return path.relative(process.cwd(), filePath);
            };
            // Si pas de photo, retourne null
            return null;
        };
        const photo_1 = await uploadPhotoUtilisateur('photo_1');
        const photo_2 = await uploadPhotoUtilisateur('photo_2');
        const photo_3 = await uploadPhotoUtilisateur('photo_3');

        try {
            let res = await newUser(
                data.get("nom"),
                data.get("prenom"),
                role,
                data.get("entreprise"),
                data.get("neq"),
                data.get("courriel"),    
                data.get("pwd"),
                data.get("site"),
                data.get("insta"),
                data.get("tiktok"),
                domaine,
                data.get("ville_id"),
                data.get("partage") == 'on' ? 1 : 0,
                data.get("affichage") == 'on' ? 1 : 0,
                data.get("abonne") == 'on' ? 1 : 0,
                finAbo,
                data.get("description"),
                data.get("adresse"),
                data.get("publique") == 'on' ? 1 : 0,
                photo_1,
                photo_2,
                photo_3,
                logo
            );

        createCookie(res.id, cookies, res.role_id);
        return {
            status: 200,
            body: {
                message: 'Utilisateur créé avec succès',
                utilisateur: res
            }
        };
        }catch(error){
            return fail(401, error);
        }
    },
    
    nouvelEvenement: async({cookies, request})=>{
        //reste à changer la variable approuvé? Enregistre 1 si le form est payant, NULL si le form est gratuit, c'est ok?
        
        const data = await request.formData();
        const type = envoieMappage(data, types);
        const verif = envoieMappage(data, verifs);
        const emplacement = envoieMappage(data, emplacements)

        //pour uploader et stocker les photos 

        const uploadPhoto = async (nomFichier) => {
            const photo = data.get(nomFichier);

            if (photo && photo.name) { 
            const buffer = Buffer.from(await photo.arrayBuffer());
            const nomTemporaire = (randomUUID() + photo.name)
            const filePath = path.resolve(cheminPhotosEven, nomTemporaire);
            fs.writeFileSync(filePath, buffer);
            return path.relative(process.cwd(), filePath);
            };
            // si pas de photo, retourne null
            return null;
        };

        const photo_1 = await uploadPhoto('photo_1');
        const photo_2 = await uploadPhoto('photo_2');
        const photo_3 = await uploadPhoto('photo_3');

        let session;
        try{
            session = await findOne({uuid: cookies.get('session')});//ça fonctionne :D
        }catch(error){
            throw (error);
        }
        try{
            let res = await creationEvenement(
                data.get('nom'),
                session.utilisateur.id,
                data.get('contact'),
                data.get('entreprise'),
                data.get('debut_even'),
                data.get('fin_even'),
                data.get('horaire_even'),
                data.get('debut_cand'),
                data.get('fin_cand'),
                data.get('fondation'),
                data.get('nb_visiteur'),
                data.get('nb_expo'),
                data.get('profil'),
                data.get('site'), 
                data.get('fb_even'),
                data.get('courriel'),
                data.get('ville_id'),
                data.get('adresse'),
                emplacement,
                type,
                data.get('type_autre'),
                data.get('form_cand'),
                verif,
                data.get('verification_autre'),
                data.get('selection') == 'on' ? 1 : 0,
                data.get('limite') == 'on' ? 1 : 0,
                data.get('description'),
                photo_1,
                photo_2,
                photo_3,
                session.utilisateur.abonne,
            )
            return {
                status: 200,
                body: {
                    message: 'Evénement créé avec succès',
                    evenement: res
                }
            };
            }catch(error){
                return fail(401, error);
            }
    },

    recuperation: async ({cookies, request}) =>{
        const data = await request.formData();
        log("dans lapi data = ", data);
        try{
            let res = await recuperationMDP(data.get('courriel'));
            log("api res = ", res);
            const lien = `http://localhost:5173/connexion/validation/${res}`;
            await envoieCourriel(data.get('courriel'),
                                'Réinitialisation de mot de passe',
                                `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${lien}`
                            );
            return {
                status: 200,
                body: {
                    message: 'Jeton créé avec succès',
                    jeton: res
                }
            }
        }catch(error){
            log("api error = ", error);
            
            return fail(401, error);
        }
    },

    changement: async ({ cookies, request}) =>{
        const data = await request.formData();
        log("api changement MDP data = ", data);
        try{
            let res = await changementMDP(data.get('utilisateur_id'), data.get('nouveau_pwd'));
            return {
                status: 200,
                body: {
                    message: res.message
                }
            };
        }catch(error){
            log("api changement error = ", error);
            
            return fail(401, error);
        }
    }
}
