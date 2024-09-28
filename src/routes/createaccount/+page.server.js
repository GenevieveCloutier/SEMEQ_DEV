import { fail } from '@sveltejs/kit';
import { createCookie } from "../../lib/db/controllers/sessions.controller.js";
import { newUser } from '../../lib/db/controllers/Utilisateurs.controller.js';


export async function load({ cookies, parent }){
    const { cookiesAll } = await parent();
    return ({cookiesAll: cookiesAll, })
    
}

export const actions = {

    new: async({ cookies, request })=>{
        const data = await request.formData();

        try {
            let res = await newUser(data.get("courriel"), "2", data.get("password"));
            createCookie(res.id, cookies);
        }catch(error){
             throw(error);
        }
    }
}