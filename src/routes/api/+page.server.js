import { fail, redirect } from '@sveltejs/kit';
import { createCookie, findOne } from "../../lib/db/controllers/sessions.controller.js";
import { authenticate, newUser } from '../../lib/db/controllers/Utilisateurs.controller.js';
import { deleteUser } from '../../lib/db/controllers/Utilisateurs.controller.js';
import { domaines, emplacements, envoieDomaine, envoieMappage, types, verifs } from '../../lib/outils/compteurBinaire.js';
import { creationEvenement } from '../../lib/db/controllers/Evenements.controller.js';

export const actions = {

    supprimeUtilisateur: async({ cookies, request })=>{
        const data = await request.formData();
        console.log(data.get('id'));
        
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

    nouvelUtilisateur: async({cookies, request})=>{
        const data = await request.formData();
        console.log("les data = ", data);
        
        const dataEntree = [...data.entries()];
        const role = dataEntree.length == 6 ? '4' : '2';
        const finAbo = data.get("abonne") == 'on' ? (new Date(Date.now() + 3.1536e10)) : null;

        const domaine = envoieMappage(data, domaines);
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
                data.get("photo_1"),
                data.get("photo_2"),
                data.get("photo_3"),
                data.get("logo")
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


    //ici
    // nouveauCompteEven: async({cookies, request})=>{
    //     const data = await request.formData();
    //     console.log('request = ',request);
    //     console.log('data = ',data);
        
    //     const domaine = envoieMappage(data, domaines);
        
    //     try {
    //         let res = await newUser(
    //             data.get("nomBase"),
    //             data.get("prenomBase"),
    //             "4",
    //             data.get("courrielBase"),    
    //             data.get("MDPBase"),
    //             data.get("villeBase"),
    //         );
    //     createCookie(res.id, cookies, res.role_id);
    //     }catch(error){
    //         return fail(401, error);
    //     }
        
    // },
    //ici


    nouvelEvenement: async({cookies, request})=>{
        const data = await request.formData();
        const type = envoieMappage(data, types);
        const verif = envoieMappage(data, verifs);
        const emplacement = envoieMappage(data, emplacements)
        console.log(data);
        
        let session;
        try{
            session = await findOne({uuid: cookies.get('session')});    
        }catch(error){
            throw (error);
        }
        
        try{
            let res = await creationEvenement(
                data.get('nomEven'),
                session.utilisateur.id,
                data.get('contactEven'),
                data.get('entrepriseEven'),
                data.get('dateEvenDebut'),
                data.get('dateEvenFin'),
                data.get('horaireEven'),
                data.get('dateAppelDebut'),
                data.get('dateAppelFin'),
                data.get('fondation'),//a verifier pour les payant
                data.get('nb_visiteur'),//a verifier pour les payant
                data.get('nb_expo'),//a verifier pour les payant
                data.get('profil'),//a verifier pour les payant
                data.get('siteWebEven'),
                data.get('lienFBEven'),
                data.get('courrielAppel'),
                data.get('villeEven'),
                data.get('adresse'),
                emplacement,
                type,
                data.get('inputType'),
                data.get('lienAppel'),
                verif,
                data.get('inputVerif'),
                data.get('typeSelection'),
                data.get('limiteSelection'),
                data.get('description'),
                data.get('photo_1'),
                data.get('photo_2'),
                data.get('photo_3'),
                session.utilisateur.abonne,
            )
            return res;
        }catch(error){
            return fail(401, error);
        }
    }
}