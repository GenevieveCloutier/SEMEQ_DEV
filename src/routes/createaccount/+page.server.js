import { fail } from '@sveltejs/kit';
import { createCookie } from "../../lib/db/controllers/sessions.controller.js";
import { newUser } from '../../lib/db/controllers/Utilisateurs.controller.js';


export async function load({ cookies, parent }){
    const { cookiesAll } = await parent();
    return ({cookiesAll: cookiesAll, })
    
}
