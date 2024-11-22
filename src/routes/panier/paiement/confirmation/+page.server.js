import { findOne } from '$lib/db/controllers/Utilisateurs.controller';

export async function load({ cookies }){
    const session = cookies.get('session');
    if (!session) {
        throw redirect(307, '/login');
    }
    const sessionId = cookies.get('id');
    const utilisateur = await findOne({ id: sessionId });

    return { utilisateur }
}