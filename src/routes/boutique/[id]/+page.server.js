import { error, redirect } from '@sveltejs/kit';
import { Produit } from "$lib/db/models/Produit.model.js"
import { Type } from "$lib/db/models/Type.model.js"
import { findOne } from '$lib/db/controllers/Utilisateurs.controller';

export async function load({ cookies, params }){
    // Pour affichage économie et/ou "Abonnements" en bas de page
    let utilisateur = null;
    const session = cookies.get('id');
    if (session) {
        utilisateur = await findOne({ id: session });
    }
    
    const paramId = params.id;
    
    const produit = await Produit.findOne({
        where: { 
            id: paramId,
            dispo: 1, //true
        },
        include: [
            { model: Type, as: "type" },
        ]
    })

    if (!produit) {
        throw error(404, 'Produit non trouvé.');
    }
    if (produit.dispo !== true) {
        throw error(404, 'Produit non disponible.');
    }
    /* Si produit est de type "Abonnement" doit renvoyer vers la bonne page
       selon nom "Exposant" ou "Organisateur", sinon erreur 404
    */
    if (produit.type_id === 1) {
        if (produit.nom.includes("exposant")) {
            throw redirect(301, '/boutique/abonnement_exposant');
        } else if (produit.nom.includes("organisateur")) {
            throw redirect(301, '/boutique/abonnement_organisateur');
        } else {
            throw error(404, 'Abonnement non trouvé.');
        }
    }
    
    let resultat = {
        ...produit.dataValues,
        // Afficher "Non défini" si le prix est null, "Gratuit" si le prix est égal à zéro, sinon afficher le prix suivit de " $"
        prix_a: produit.prix_a === null ? "Non défini" : produit.prix_a === 0 ? "Gratuit" : `${produit.prix_a.toFixed(2)} $`,
        prix_v: produit.prix_v === null ? "Non défini" : produit.prix_v === 0 ? "Gratuit" : `${produit.prix_v.toFixed(2)} $`,
        type: produit.type ? produit.type.dataValues : null,
    };

    return { produit: resultat, utilisateur }
}