import { Achat } from "$lib/db/models/Achat.model";
import { Utilisateur } from "$lib/db/models/Utilisateur.model";
import { Produit } from "$lib/db/models/Produit.model";
import { Type } from "$lib/db/models/Type.model";
import { findOne } from '$lib/db/controllers/Utilisateurs.controller';
import { Op } from 'sequelize';

export async function load({ cookies, params }){
    const cookiesId = cookies.get('id');
    const user = await findOne({ id: cookiesId });

    // Pour afficher la bonne facture avec createdAt de la date AAAA-MM-JJ
    const date = new Date(params.date);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const achats = await Achat.findAll({
        where: { 
            utilisateur_id: user.id,
            createdAt: {
                [Op.between]: [startOfDay, endOfDay]
            }
        },
        include: [
            { model: Utilisateur, as: "utilisateur" },
            { model: Produit, as: "produit",
                include: [
                  { model: Type, as: "type" }
                ]
            }
        ]
    })

    if (achats.length === 0) {
        return {
            status: 404,
            body: { message: "Aucune commande n'a été trouvée pour cette date." }
        };
    }

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
                produits: [],
                prixTotal: 0
            };
        }
        acc[date].produits.push({
            nom: achat.produit.nom,
            type: achat.produit.type.nom,
            prix: achat.prix
        });
        acc[date].prixTotal += parseFloat(achat.prix.replace(' $', '').replace('Gratuit', '0').replace('Non défini', '0')) || 0;
        return acc;
    }, {});

    // Convertir l'objet en tableau pour faciliter l'affichage
    const aggregatedAchatsArray = Object.values(aggregatedAchats).map(agg => ({
        ...agg,
        prixTotal: agg.prixTotal === 0 ? "Gratuit" : `${agg.prixTotal.toFixed(2)} $`,
    }));

    const facture = aggregatedAchatsArray[0];

    return {
        user: { id: user.id },
        facture: {
            date: facture.date,
            client: {
                nom: user.nom,
                prenom: user.prenom,
                entreprise: user.entreprise,
                adresse: user.adresse,
                ville: user.ville.nom,
                code_postal: user.code_postal,
            },
            items: facture.produits.map(produit => ({
                nom: produit.nom,
                type: produit.type,
                prix: produit.prix
            })),
            total: facture.prixTotal
        }
    };
}