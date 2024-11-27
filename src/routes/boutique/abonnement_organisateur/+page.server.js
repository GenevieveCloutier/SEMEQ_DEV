import { error } from '@sveltejs/kit';
import { Op } from "sequelize";
import { Produit } from "$lib/db/models/Produit.model.js"
import { Type } from "$lib/db/models/Type.model.js"

export async function load({ params }){      
    const abonnementsEven = await Produit.findAll({
        where: {
            dispo: 1, //true
            type_id: 1, //Abonnement
            nom: {
                [Op.like]: 'Abonnement organisateur%'
            },
            prix_v: {
                [Op.ne]: null //Prix visiteur n'est PAS null
            }
        },
        include: [
            { model: Type, as: "type" },
        ],
        order: [
            ['desc', 'ASC']
        ]
    })
    if (!abonnementsEven) {
        throw error(404, 'Aucun abonnement organisateur trouvé.');
    }

    let resultat = abonnementsEven.map(abonnement => ({
        ...abonnement.dataValues,
        // Afficher "Gratuit" si le prix est égal à zéro, sinon afficher le prix suivit de " $"
        prix_v: abonnement.prix_v === 0 ? "Gratuit" : `${abonnement.prix_v.toFixed(2)} $`,
        type: abonnement.type ? abonnement.type.dataValues : null,
    }));

    return { abonnementsEven: resultat }
}