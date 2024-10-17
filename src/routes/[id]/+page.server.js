import { error, redirect } from '@sveltejs/kit';
import { findOne } from '$lib/db/controllers/Utilisateurs.controller';

export async function load({ cookies, params }){
    // Récupérer user_id de la session
    const cookiesId = cookies.get('id');
    if (!cookiesId) {
        throw redirect(307, '/login');
    }

    const paramId = params.id;

    const user = await findOne({ id: paramId });
    if (!user) {
        throw error(404, 'Utilisateur non trouvé.');
    }

    return { user:user };
}