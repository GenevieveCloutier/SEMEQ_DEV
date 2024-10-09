import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
    const role = cookies.get('role');

    if (!role) {
        throw redirect(302, '/connexion');
    }
    
    return { role: role };
}