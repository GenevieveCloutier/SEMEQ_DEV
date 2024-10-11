import { findAll } from '$lib/db/controllers/Villes.controller';

export async function load({cookies}){
    const villes = await findAll();
    return {villes}
}