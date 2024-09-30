import { fail } from '@sveltejs/kit';
import { createCookie } from "../../lib/db/controllers/sessions.controller.js";
import { authenticate, newUser } from '../../lib/db/controllers/Utilisateurs.controller.js';
import { deleteUser } from '../../lib/db/controllers/Utilisateurs.controller.js';

export const actions = {

    new: async({ cookies, request })=>{
        const data = await request.formData();

        try {
            let res = await newUser(data.get("courriel"), "2", data.get("password"));
            createCookie(res.id, cookies);
        }catch(error){
            return fail(401, error);
        }
    },

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
    }
}