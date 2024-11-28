import { Partenaire } from "$lib/db/models/Partenaire.model.js"
import { Categorie } from "$lib/db/models/Categorie.model.js"
import { findAll } from '../../../../lib/db/controllers/Categories.controller';

export async function load({ params }){
    const paramId = params.id;

    const categories = await findAll();
    
    const code = await Partenaire.findOne({
        where: { id: paramId },
        include: [
            { model: Categorie, as: "categorie" },
        ]
    })
    
    let resultat = {
        ...code.dataValues,
        expiration: code.expiration ? code.expiration.toLocaleDateString('fr-CA', { timeZone: 'UTC' }) : null,
        categorie: code.categorie ? code.categorie.dataValues : null,
    };

    return { code: resultat, categories }
}