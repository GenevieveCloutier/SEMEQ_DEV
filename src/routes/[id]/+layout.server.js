import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
    const role = cookies.get('role');
    const id = cookies.get('id');

    if (!role) {
        throw redirect(302, '/connexion');
    }
    
    return { role, id };
}