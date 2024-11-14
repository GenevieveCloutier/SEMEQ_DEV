import { findAll } from '$lib/db/controllers/Villes.controller.js';
import {Evenement} from '$lib/db/models/Evenement.model.js';
import { redirect } from '@sveltejs/kit';
import { log } from '../../../../lib/outils/debug.js';
import { findOne } from '../../../../lib/db/controllers/Evenements.controller.js';
import { emplacements, recupMappage, types, verifs } from '../../../../lib/outils/compteurBinaire.js';


export async function load({cookies, params}){
    const villes = await findAll();
    let evenement = await findOne({id: params.id});
    evenement.debut_even = evenement.debut_even.toLocaleDateString('fr-CA');
    evenement.fin_even = evenement.fin_even.toLocaleDateString('fr-CA');
    evenement.debut_cand = evenement.debut_cand.toLocaleDateString('fr-CA');
    evenement.fin_cand = evenement.fin_cand.toLocaleDateString('fr-CA');

    const liste_emplacement = recupMappage( evenement.emplacement, emplacements)
    const liste_type = recupMappage( evenement.type, types);
    const liste_verif = recupMappage( evenement.verification, verifs);

    const session = cookies.get('session');
    const role = cookies.get('role');

    
    return {villes, session, role, evenement, liste_emplacement, liste_type, liste_verif};
}