import { fail, redirect } from '@sveltejs/kit';
import { createCookie, findOne as findSession } from "../../lib/db/controllers/sessions.controller.js";
import { authenticate, changementMDP, modificationUtilisateur, newUser, recuperationMDP } from '../../lib/db/controllers/Utilisateurs.controller.js';
import { deleteUser, findOne } from '../../lib/db/controllers/Utilisateurs.controller.js';
import { domaines, emplacements, envoieDomaine, envoieMappage, types, verifs } from '../../lib/outils/compteurBinaire.js';
import { creationEvenement } from '../../lib/db/controllers/Evenements.controller.js';
import { ajoutProduitPanier, deleteCart } from '../../lib/db/controllers/Paniers.controller.js';
import { envoieCourriel } from '../../lib/outils/nodeMailer.js';
import { log } from '../../lib/outils/debug.js';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

//Chemins de base pour stocker les photos
const cheminBase = path.join(process.cwd(), 'src/lib/img/app/evenements'); 
const cheminLogos = path.join(process.cwd(), 'src/lib/img/app/logos');
const cheminPhotosUtilisateurs = path.join(process.cwd(), 'src/lib/img/app/utilisateurs');

export const actions = {

    /**
    ** Action pour supprimer un utilisateur à partir de son identifiant, avec option de redirection.
    *
    * @param {Cookies} cookies - Les cookies pour gérer la session utilisateur si nécessaire.
    * @param {Request} request - La requête contenant les données du formulaire, incluant l'identifiant de l'utilisateur à supprimer.
    * 
    * @returns {Object} - Le résultat de la suppression de l'utilisateur, ou une redirection éventuelle après suppression.
    */
    supprimeUtilisateur: async({ cookies, request })=>{
        const data = await request.formData();
        log("api id = ",data.get("id").id)
        const result = await deleteUser(data.get('id'));
        return result;
    },

    /**
     ** Action pour authentifier un utilisateur en vérifiant les informations d'identification et en créant un cookie de session.
     *
     * @param {Cookies} cookies - Les cookies pour enregistrer la session utilisateur après authentification.
     * @param {Request} request - La requête contenant les données du formulaire de connexion (courriel et mot de passe).
     * 
     * @returns {Object} - Objet de réponse avec `success: true`, la session et l'identifiant utilisateur en cas de succès, 
     *                     ou un échec avec statut 401 en cas d'erreur d'authentification.
     */
    connexionUtilisateur: async({ cookies, request })=>{
        const data = await request.formData();
        console.log(data);
        
        try {
            let res = await authenticate(data.get("courriel"), data.get("pwd"));
            createCookie(res.id, cookies, res.role_id)
            return { success: true, session: cookies.get("session"), res: res.id}
        }catch(error){
            return fail(401, error);
        }
    },

    //tous les utilisateurs (gratuit, exposant, organisateur à venir) doivent être créés par ici
    /**
    ** Action pour créer un nouvel utilisateur en enregistrant les données de formulaire et les photos, puis en définissant
    * le rôle et la durée d'abonnement de l'utilisateur selon les paramètres fournis.
    *
    * @param {Cookies} cookies - Les cookies utilisés pour définir la session utilisateur.
    * @param {Request} request - La requête contenant les données du formulaire d'inscription de l'utilisateur.
    * 
    * @returns {Object} - Objet de réponse avec un statut 200 et l'utilisateur créé en cas de succès,
    *                     ou un échec avec statut 401 en cas d'erreur.
    */
    nouvelUtilisateur: async({cookies, request})=>{
        const data = await request.formData();
        //log("les data = ", data);
        
        const dataEntree = [...data.entries()];
        const role = dataEntree.length == 6 ? '4' : envoieMappage(data, domaines) == 0 ? '2' : '3';
        const finAbo = data.get("abonne") == 'on' ? (new Date(Date.now() + 3.1536e10)) : null;

        const domaine = envoieMappage(data, domaines);

        // Pour uploader et stocker les logos
        const uploadLogo = async (nomFichier) => {
            const logo = data.get(nomFichier);

            if (logo && logo.name) { 
            const buffer = Buffer.from(await logo.arrayBuffer());
            const nomTemporaire = (randomUUID() + logo.name)
            const filePath = path.resolve(cheminLogos, nomTemporaire);
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
            const nomTemporaire = (randomUUID() + photo.name)
            const filePath = path.resolve(cheminPhotosUtilisateurs, nomTemporaire);
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
    
    /**
     ** Action pour créer un nouvel événement avec données et photos, et gérer l'approbation en fonction de l'abonnement de l'utilisateur.
     *
     * @param {Cookies} cookies - Les cookies contenant la session utilisateur.
     * @param {Request} request - La requête contenant les données du formulaire pour créer un événement.
     * 
     * @returns {Object} - Objet de réponse avec un statut 200 et l'événement créé en cas de succès,
     *                     ou un échec avec statut 401 en cas d'erreur.
     */

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
            const filePath = path.resolve(cheminBase, photo.name);
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
            //log("session dans api = ", session.utilisateur.abonne);
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

    /**
    ** Action pour initier la récupération de mot de passe en envoyant un courriel de réinitialisation.
    *
    * @param {Object} context - Le contexte de l'action.
    * @param {Cookies} context.cookies - Les cookies pour gérer la session utilisateur.
    * @param {Request} context.request - La requête contenant les données du formulaire avec l'adresse courriel de l'utilisateur.
    * 
    * @returns {Object} - Objet de réponse avec un statut 200 et le jeton de réinitialisation si réussi, 
    *                     ou retourne un échec avec un statut 401 en cas d'erreur.
    */
    recuperation: async ({cookies, request}) =>{
        const data = await request.formData();
        //log("dans lapi data = ", data);
        try{
            let res = await recuperationMDP(data.get('courriel'));
            const lien = `http://localhost:5173/connexion/validation/${res.jeton}`;
            const courrielComplet = redacteurCourriel(res.utilisateur.prenom, lien);
            await envoieCourriel(data.get('courriel'),
                                'Réinitialisation de mot de passe',
                                courrielComplet
                            );
            return {
                status: 200,
                body: {
                    message: 'Jeton créé avec succès',
                    jeton: res.jeton
                }
            }
        }catch(error){
            //log("api error = ", error);
            
            return fail(401, error);
        }
    },

    /**
    ** Action pour changer le mot de passe d'un utilisateur.
    *
    * @param {Object} context - Le contexte de l'action.
    * @param {Cookies} context.cookies - Les cookies pour identifier l'utilisateur.
    * @param {Request} context.request - La requête contenant les données du formulaire, y compris l'ID de l'utilisateur et le nouveau mot de passe.
    * 
    * @returns {Object} - Objet de réponse contenant le statut et le message de succès 
    *                     ou retourne un échec avec un statut 401 en cas d'erreur.
    */
    changement: async ({ cookies, request}) =>{
        const data = await request.formData();
        //log("api changement MDP data = ", data);
        try{
            let res = await changementMDP(data.get('utilisateur_id'), data.get('nouveau_pwd'));
            return {
                status: 200,
                body: {
                    message: res.message
                }
            };
        }catch(error){
            //log("api changement error = ", error);
            return fail(401, error);
        }
    },

    /**
    ** Action pour modifier les informations d'un utilisateur.
    *
    * @param {Object} context - Le contexte de l'action.
    * @param {Cookies} context.cookies - Les cookies pour identifier l'utilisateur.
    * @param {Request} context.request - La requête contenant les données du formulaire.
    * 
    * @returns {Object} - Objet de réponse contenant le statut et le message de succès
    *                     ou retourne un échec avec un statut 401 en cas d'erreur.
    */
    modifUtilisateur: async ({cookies, request})=>{
        const data = await request.formData();
        // log("dans l'api, modif utilisateur, data = ", data.get('nom'));
        // log("dans l'api, modif utilisateur, cookies = ", cookies.get('role'));
        try{
            log("data = ", data)
            if (cookies.get('role') == 4 && !data.get('role_id')){
                // log("api dans le if modif = ", data.get('role_id'))
                let res = await modificationUtilisateur(cookies.get('id'), {
                    nom: data.get('nom'),
                    prenom: data.get('prenom'),
                    courriel: data.get('courriel'),
                    ville_id: data.get('ville_id')
                });
                
            log("res = ", res)
            }
			else if (cookies.get('role') == 3 && !data.get('role_id')){
				const domaine = envoieMappage(data, domaines);
				//*Reprise du code de Gen pour les upload d'image
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
				let res = await modificationUtilisateur(cookies.get('id'), {
					nom: data.get("nom"),
                	prenom: data.get("prenom"),
                	entreprise: data.get("entreprise"),
                	neq: data.get("neq"),
                	courriel: data.get("courriel"),
                	site: data.get("site"),
                	insta: data.get("insta"),
                	tiktok: data.get("tiktok"),
                	domaine: domaine,
                	ville_id: data.get("ville_id"),
                	partage: data.get("partage") == 'on' ? 1 : 0,
                	affichage: data.get("affichage") == 'on' ? 1 : 0,
                	description: data.get("description"),
                	adresse: data.get("adresse"),
                	publique: data.get("publique") == 'on' ? 1 : 0,
                	photo_1: photo_1,
                	photo_2: photo_2,
                	photo_3: photo_3,
                	log: logo
				});
			}
            else if(cookies.get('role') == 2 && !data.get('role_id')){
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
                let res = await modificationUtilisateur(cookies.get('id'), {
					nom: data.get("nom"),
                	prenom: data.get("prenom"),
                	entreprise: data.get("entreprise"),
                	neq: data.get("neq"),
                	courriel: data.get("courriel"),
                	site: data.get("site"),
                	insta: data.get("insta"),
                	tiktok: data.get("tiktok"),
                	ville_id: data.get("ville_id"),
                	logo: logo
				});
            }
            return{
                status: 200,
                body: {
                    message: 'Utilisateur modifié avec succès'
                }
            };
        }catch(error){
            log("Erreur dans l'API de modification = ", error)
            return fail(401, error);
        }
    },

    ajouterPanier: async({cookies, request})=>{        
        const data = await request.formData();

        let session;
        try{
            session = await findSession({ uuid: cookies.get('session') });
        }catch(error){
            throw (error);
        }
        try{
            let res = await ajoutProduitPanier(
                session.utilisateur.id,
                data.get('produit_id'),
            )
            return {
                status: 200,
                body: {
                    message: 'Produit ajouté au panier avec succès',
                    evenement: res
                }
            };
            }catch(error){
                return fail(401, error);
            }
    },

    deleteOnePanier: async({cookies, request})=>{        
        const data = await request.formData();
        
        try{
            let res = await deleteCart({ id: data.get('panier_id')});
            return {
                status: 200,
                body: {
                    message: 'Produit retiré du panier avec succès',
                    evenement: res
                }
            };
            }catch(error){
                return fail(401, error);
            }
    },
}

/**
 ** Génère un template HTML pour un courriel de réinitialisation de mot de passe.
 *
 * @param {string} prenom - Le prénom du destinataire du courriel.
 * @param {string} lien - L'URL pour réinitialiser le mot de passe.
 * @returns {string} - Le contenu HTML du courriel.
 */
//!faudras changer le lien pour le logo, tant qu'on travail en local ca marche pas.
function redacteurCourriel(prenom, lien) {
    return (
        `
    <!doctype html>
    <html lang="fr-CA">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>
                body {
                    font-family: 'Poppins', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 10px;
                }
                .header {
                    text-align: center;
                    background-color: #f4f4f4;
                    padding: 20px;
                    border-radius: 10px 10px 0 0;
                }
                .header img {
                    max-width: 150px;
                }
                .header p {
                    font-size: 16px;
                    text-transform: uppercase;
                    font-weight: bold;
                    text-align: left;
                    margin-top: 10px;
                }
                h1 {
                    font-size: 24px;
                    color: #184287;
                }
                .button {
                    background-color: #184287;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                    display: inline-block;
                    margin-top: 20px;
                }
                .footer {
                    margin-top: 30px;
                    font-size: 10px; /* Réduis cette valeur pour que le texte soit plus petit */
                    color: #666666;
                    text-align: center;
                }
                p {
                    font-size: 14px;
                    color: #333333;
                    line-height: 1.5;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <figure>
                        <a href="/">
                            <img src="/src/lib/img/app/logo.png" alt="logo SEMEQ" /> 
                        </a>
                    </figure>
                    <p>Le répertoire des salons, événements, marchés et expositions du Québec</p>
                </div>
                <h1>Réinitialisation de mot de passe</h1>
                <p>Bonjour ${prenom}.</p>
                <p>Une demande de réinitialisation de mot de passe a été reçue pour votre compte.</p>
                <p>Si vous n'êtes pas à l'origine de cette demande, vous pouvez simplement ignorer ce message.</p>
                <p>Pour réinitialiser votre mot de passe, cliquez sur le bouton ci-dessous pour être redirigé vers le répertoire SEMEQ.</p>
                <a href="${lien}" class="button">Changer de mot de passe</a>
                <footer class="footer">
                    <p>Si vous rencontrez un problème avec le bouton, vous pouvez aussi copier/coller cette adresse dans votre navigateur :</p>
                    <p>${lien}</p>
                    <p>© 2024 Répertoire SEMEQ - Tous droits réservés</p>
                </footer>
            </div>
        </body>
    </html>
    `
    );
}