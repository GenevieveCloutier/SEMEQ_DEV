import { redirect } from '@sveltejs/kit';
import { findOne } from '$lib/db/controllers/Utilisateurs.controller';

export async function load({ cookies }){
    const role = cookies.get('role');
    const id = cookies.get('id');
    const user = await findOne({ id: id });
    let abonne = user.abonne;

    if (!role) {
        throw redirect(302, '/connexion');
    }
    
    return { role, id, abonne };
}