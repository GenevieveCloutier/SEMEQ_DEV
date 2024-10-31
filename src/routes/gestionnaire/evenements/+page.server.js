import { findAll } from '$lib/db/controllers/Evenements.controller.js';
import { log } from '../../../lib/outils/debug.js';

export async function load({ cookies, params,}){
    let evenements = await findAll();
    evenements.map((x)=> {   
        x.debut_even = x.debut_even.toLocaleDateString('fr-CA');
        x.fin_even = x.fin_even.toLocaleDateString('fr-CA');
        x.region = x.ville.region.nom.slice(0, -5).replace('--', '-');
        x.utilisateur_nom = x.utilisateur.nom;
            return x;});


    // log("Load evenement = ", evenements)
    return {evenements};
}