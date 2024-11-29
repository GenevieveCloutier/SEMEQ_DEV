import { findOne } from '$lib/db/controllers/Partenaires.controller';
import { Produit } from "$lib/db/models/Produit.model.js"
import { findAll as findAllProduits } from '../../../../lib/db/controllers/Produits.controller';
import { findAll as findAllCategories } from '../../../../lib/db/controllers/Categories.controller';
import { findAll as findAllTypes } from '../../../../lib/db/controllers/Types.controller';

export async function load({ params }){
    const paramId = params.id;

    const categories = await findAllCategories();
    const types = await findAllTypes();
    const produits = await findAllProduits()

    const code = await findOne({ id: paramId });
    code.expiration = code.expiration ? code.expiration.toLocaleDateString('fr-CA', { timeZone: 'UTC' }) : null;
    if (!code) {
        throw error(404, 'Partenaire non trouvé.');
    }

    return { code:code, categories, types, produits };
}