import { fail } from '@sveltejs/kit';
import { createCookie } from "../../lib/db/controllers/sessions.controller.js";

export const actions = {

    new: async({ cookies, request })=>{
        const data = await request.formData();

        try {
            let res = await newUser(data.get("courriel"), "2", data.get("password"));
            createCookie(res.id, cookies);
        }catch(error){
            return fail(401, error);
        }
    }
}