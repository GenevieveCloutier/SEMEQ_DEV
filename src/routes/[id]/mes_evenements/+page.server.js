import { findAllWhere } from '../../../lib/db/controllers/Evenements.controller.js';
import { findOne } from '../../../lib/db/controllers/Utilisateurs.controller.js';
import { log } from '../../../lib/outils/debug.js';

export async function load({cookies}) {
    try {
        const evenements = await findAllWhere({utilisateur_id: cookies.get('id')});
        const utilisateur = await findOne({id: cookies.get('id')});
        return({evenements, utilisateur});
    } catch (error) {
    console.log(error);
    }
}