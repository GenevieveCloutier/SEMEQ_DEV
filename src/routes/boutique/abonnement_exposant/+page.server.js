import { error } from '@sveltejs/kit';
import { Op } from "sequelize";
import { Produit } from "$lib/db/models/Produit.model.js"
import { Type } from "$lib/db/models/Type.model.js"

export async function load({ params }){      
    const abonnementsExpo = await Produit.findAll({
        where: {
            dispo: 1, //true
            type_id: 1, //Abonnement
            nom: {
                [Op.like]: 'Abonnement exposant%'
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
    if (!abonnementsExpo) {
        throw error(404, 'Aucun abonnement exposant trouvé.');
    }

    let resultat = abonnementsExpo.map(abonnement => ({
        ...abonnement.dataValues,
        // Afficher "Non défini" si le prix est null, "Gratuit" si le prix est égal à zéro, sinon afficher le prix suivit de " $"
        prix_a: abonnement.prix_a === null ? "Non défini" : abonnement.prix_a === 0 ? "Gratuit" : `${abonnement.prix_a.toFixed(2)} $`,
        prix_v: abonnement.prix_v === null ? "Non défini" : abonnement.prix_v === 0 ? "Gratuit" : `${abonnement.prix_v.toFixed(2)} $`,
        type: abonnement.type ? abonnement.type.dataValues : null,
    }));

    return { abonnementsExpo: resultat }
}