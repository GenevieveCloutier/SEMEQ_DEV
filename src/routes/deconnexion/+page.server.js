import { fail } from '@sveltejs/kit';
import { deleteCookie } from '$lib/db/controllers/sessions.controller.js';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies })
{
    const session = cookies.get("session");
    if (!session)
        throw redirect(302, '/');
    try {
        deleteCookie(cookies);
        return {succes: true};
    }catch(error){
        return fail(401, 'Erreur lors de la déconnexion.');
    }
}