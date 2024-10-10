import { findAll } from '$lib/db/controllers/Villes.controller.js';

export async function load({cookies}){
    const villes = await findAll();
    return{villes} 
}