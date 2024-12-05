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
        createdAt: achat.createdAt.toLocaleDateString('fr-CA', {timeZone: 'UTC'}),
        utilisateur: achat.utilisateur ? achat.utilisateur.dataValues : null,
        produit: achat.produit ? {
            ...achat.produit.dataValues,
            type: achat.produit.type ? achat.produit.type.dataValues : null
        } : null
    }));

    // Agréger les achats par date
    const aggregatedAchats = resultat.reduce((acc, achat) => {
        const date = achat.createdAt;
        if (!acc[date]) {
            acc[date] = {
                date,
                ids: [],
                produits: [],
                prixTotal: 0
            };
        }
        acc[date].ids.push(achat.id);
        acc[date].produits.push(achat.produit.nom);
        acc[date].prixTotal += parseFloat(achat.prix.replace(' $', '').replace('Gratuit', '0').replace('Non défini', '0')) || 0;
        return acc;
    }, {});

    // Convertir l'objet en tableau pour faciliter l'affichage
    const aggregatedAchatsArray = Object.values(aggregatedAchats).map(agg => ({
        ...agg,
        prixTotal: agg.prixTotal === 0 ? "Gratuit" : `${agg.prixTotal.toFixed(2)} $`,
    }));

    return { aggregatedAchats: aggregatedAchatsArray, user };
}