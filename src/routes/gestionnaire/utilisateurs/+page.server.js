import { findAll } from '$lib/db/controllers/Utilisateurs.controller.js';
import { log } from '../../../lib/outils/debug.js';

export async function load({ cookies, params,}){
    let utilisateurs = await findAll();
    utilisateurs.shift();
    const utilisateursModifie = utilisateurs.map((x)=> {x.fin_abo = x.fin_abo != null ? x.fin_abo.toLocaleDateString('fr-CA') : 'Non abonné';
                                                        x.role_nom = x.role.nom;
                                                            return x;});
    return {utilisateursModifie};
}