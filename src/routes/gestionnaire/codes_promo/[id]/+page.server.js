import { Partenaire } from "$lib/db/models/Partenaire.model.js"
import { Categorie } from "$lib/db/models/Categorie.model.js"
import { Produit } from "$lib/db/models/Produit.model.js"
import { Type } from "$lib/db/models/Categorie.model.js"
import { findAll as findAllCategories } from '../../../../lib/db/controllers/Categories.controller';
import { findAll as findAllTypes } from '../../../../lib/db/controllers/Types.controller';

export async function load({ params }){
    const paramId = params.id;

    const categories = await findAllCategories();
    const types = await findAllTypes();
    
    const produits = await Produit.findAll({
        order: [
            ['nom', 'ASC']
        ],
    })
    let resProduits = produits.map(produit => ({
        ...produit.dataValues,
    }));
    
    const code = await Partenaire.findOne({
        where: { id: paramId },
        include: [
            { model: Categorie, as: "categorie" },
            { model: Produit, as: "produit" },
            { model: Type, as: "type" },
        ]
    })
    
    let resultat = {
        ...code.dataValues,
        expiration: code.expiration ? code.expiration.toLocaleDateString('fr-CA', { timeZone: 'UTC' }) : null,
        categorie: code.categorie ? code.categorie.dataValues : null,
        produit: code.produit ? code.produit.dataValues : null,
        type: code.type ? code.type.dataValues : null,
    };

    return { code: resultat, categories, types, produits: resProduits }
}