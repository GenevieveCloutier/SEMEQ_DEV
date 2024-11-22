import { Achat } from "$lib/db/models/Achat.model";
import { Utilisateur } from "$lib/db/models/Utilisateur.model";
import { Produit } from "$lib/db/models/Produit.model";
import { Type } from "$lib/db/models/Type.model";
import { findOne } from '$lib/db/controllers/Utilisateurs.controller';

export async function load({ cookies, params }){
    const cookiesId = cookies.get('id');
    const user = await findOne({ id: cookiesId });

    const achats = await Achat.findAll({
        order: [
            ['date', 'DESC']  // Derniers achetés en premiers
          ],
        where: { utilisateur_id: user.id },
        include: [
            { model: Utilisateur, as: "utilisateur" },
            { model: Produit, as: "produit",
                include: [
                  { model: Type, as: "type" }
                ]
            }
        ]
    })

    let resultat = achats.map(achat => ({
        ...achat.dataValues,
        prix: achat.prix === null ? "Non défini" : achat.prix === 0 ? "Gratuit" : `${achat.prix.toFixed(2)} $`,
        date: achat.date.toLocaleDateString('fr-CA', {timeZone: 'America/Montreal'}),
        utilisateur: achat.utilisateur ? achat.utilisateur.dataValues : null,
        produit: achat.produit ? {
            ...achat.produit.dataValues,
            type: achat.produit.type ? achat.produit.type.dataValues : null
        } : null
    }));

    return { resultat }
}