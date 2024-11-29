import { findAll as findAllCategories } from '../../../../lib/db/controllers/Categories.controller';
import { Produit } from "$lib/db/models/Produit.model.js"
import { findAll as findAllTypes } from '../../../../lib/db/controllers/Types.controller';

export async function load({params}) {
    const categories = await findAllCategories();
    const types = await findAllTypes();

    const produits = await Produit.findAll({
        order: [
            ['nom', 'ASC']
        ],
    })

    let resultat = produits.map(produit => ({
        ...produit.dataValues,
    }));

    return {categories, types, produits: resultat };
}