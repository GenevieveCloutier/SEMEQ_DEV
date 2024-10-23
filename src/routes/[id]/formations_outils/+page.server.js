import { Achat } from "$lib/db/models/Achat.model";
import { Utilisateur } from "$lib/db/models/Utilisateur.model";
import { Produit } from "$lib/db/models/Produit.model";
import { Type } from "$lib/db/models/Type.model";
import { findAll } from '$lib/db/controllers/Types.controller.js'; 

export async function load({ cookies, params }){
    const cookiesId = cookies.get('id');
    const user = await Utilisateur.findOne({ id: cookiesId });

    // Récupérer tous les types pour filtrage sauf celui "Abonnement"
    const types = (await findAll()).filter(type => type.nom !== "Abonnement");

    const achats = await Achat.findAll({
        order: [
            ['date', 'DESC']  // Derniers achetés en premiers
          ],
        where: { utilisateur_id: user },
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
        prix: achat.prix === 0 ? "Gratuit" : `${achat.prix.toFixed(2)} $`,
        utilisateur: achat.utilisateur ? achat.utilisateur.dataValues : null,
        produit: achat.produit ? {
            ...achat.produit.dataValues,
            type: achat.produit.type ? achat.produit.type.dataValues : null
        } : null
    }));

    return { achats: resultat, types: types }
}