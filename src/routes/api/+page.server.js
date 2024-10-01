import { fail } from '@sveltejs/kit';
import { createCookie } from "../../lib/db/controllers/sessions.controller.js";
import { authenticate, newUser } from '../../lib/db/controllers/Utilisateurs.controller.js';
import { deleteUser } from '../../lib/db/controllers/Utilisateurs.controller.js';
import { envoieDomaine } from '../../lib/outils/compteurBinaire.js';

export const actions = {

    //Fait a la base pour tester l'api de creation

    // new: async({ cookies, request })=>{
    //     const data = await request.formData();

    //     try {
    //         let res = await newUser(data.get("courriel"), "2", data.get("password"));
    //         createCookie(res.id, cookies);
    //     }catch(error){
    //         return fail(401, error);
    //     }
    // },

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
            let res = await authenticate(data.get("courriel"), data.get("password"));
            createCookie(res.id, cookies)
            // console.log('res = ', res);
            return { success: true, session: cookies.get("session"), res: res.id}
        }catch(error){
            console.log("Erreur lors de la connexion : ", error);
            return fail(401, error);
        }
    },

    nouveauExposant: async({cookies, request})=>{
        const data = await request.formData();
        const domaines = envoieDomaine(data);
        //Faudras ajouter les champs NULL quand les autre roles seront fait
        try {
            let res = await newUser(
                data.get("nom"),
                data.get("prenom"),
                "3",
                data.get("entreprise"),
                data.get("neq"),
                data.get("courriel"),    
                data.get("password"),
                data.get("site"),
                data.get("insta"),
                data.get("tiktok"),
                domaines,
                data.get("ville_id"),
                data.get("partage"),
                data.get("affichage"),
                data.get("abonne"),
                data.get("fin_abo"),
                data.get("description"),
                data.get("adresse"),
                data.get("publique"),
                data.get("photo_1"),
                data.get("photo_2"),
                data.get("photo_3"),
                data.get("logo")
            );
            createCookie(res.id, cookies);
        }catch(error){
            return fail(401, error);
        }
        
    }
}