import { findOne } from '../../../../lib/db/controllers/Produits.controller.js';
import { findAll } from '../../../../lib/db/controllers/Types.controller';

export async function load({params}) {
    const produit = await findOne({id : params.id});
    const types = await findAll();
    types.shift();
    return {produit, types};
}