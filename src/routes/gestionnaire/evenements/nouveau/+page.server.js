import { findAll } from '$lib/db/controllers/Villes.controller.js';
import { redirect } from '@sveltejs/kit';

export async function load({cookies}){
    const villes = await findAll();   

    const session = cookies.get('session');
    const role = cookies.get('role');

    
    return {villes, session, role};
}