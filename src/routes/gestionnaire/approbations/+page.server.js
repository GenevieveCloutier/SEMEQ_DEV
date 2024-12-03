import { findAll } from '$lib/db/controllers/Evenements.controller.js';
import { Op } from 'sequelize';
import { findAllWhere } from '../../../lib/db/controllers/Evenements.controller.js';
import { log } from '../../../lib/outils/debug.js';

export async function load({ cookies, params,}){
    let evenements = await findAllWhere({
            [Op.or]:[
                {approuve: false},
                {approuve: null}
            ]
    });
    
    evenements.map((x)=> {   
        x.debut_even = x.debut_even.toLocaleDateString('fr-CA', {timeZone: 'UTC'});
        x.fin_even = x.fin_even.toLocaleDateString('fr-CA', {timeZone: 'UTC'});
        x.fin_cand = x.fin_cand.toLocaleDateString('fr-CA', {timeZone: 'UTC'});
        x.debut_cand = x.debut_cand.toLocaleDateString('fr-CA', {timeZone: 'UTC'});
        x.region = x.ville.region.nom.slice(0, -5).replace('--', '-');
        x.utilisateur_nom = x.utilisateur.nom;
            return x;});

    return {evenements};
}