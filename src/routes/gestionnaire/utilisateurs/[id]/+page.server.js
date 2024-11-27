import { findOne } from '../../../../lib/db/controllers/Utilisateurs.controller';
import { findAll } from '../../../../lib/db/controllers/Villes.controller.js';

export async function load({params}) {
    const villes = await findAll();
    const user = await findOne({id: params.id});
    return { user: user, villes}
}