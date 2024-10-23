import { error } from '@sveltejs/kit';
import { Produit } from "$lib/db/models/Produit.model.js"
import { Type } from "$lib/db/models/Type.model.js"
import { Utilisateur } from "$lib/db/models/Utilisateur.model.js"

export async function load({ cookies, params }){
    // Pour affichage économie et/ou "Abonnements" en bas de page
    const cookiesId = cookies.get('id');
    const user = await Utilisateur.findOne({ id: cookiesId });
    let abonne = user.abonne;
    
    const paramId = params.id;
    
    const produit = await Produit.findOne({
        where: { id: paramId },
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
    
    let resultat = {
        ...produit.dataValues,
        // Afficher "Gratuit" si le prix est égal à zéro, sinon afficher le prix suivit de " $"
        prix_a: produit.prix_a === 0 ? "Gratuit" : `${produit.prix_a} $`,
        prix_v: produit.prix_v === 0 ? "Gratuit" : `${produit.prix_v} $`,
        type: produit.type ? produit.type.dataValues : null,
    };

    return { produit: resultat, abonne }
}