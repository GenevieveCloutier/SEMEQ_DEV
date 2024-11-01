import { redirect } from '@sveltejs/kit';
import { Panier } from "$lib/db/models/Panier.model.js"
import { Produit } from "$lib/db/models/Produit.model.js"
import { Type } from "$lib/db/models/Type.model";
import { Utilisateur } from "$lib/db/models/Produit.model.js"
import { findOne } from '$lib/db/controllers/Utilisateurs.controller';
import { findAll } from '$lib/db/controllers/Paniers.controller';

export async function load({ cookies }){
    const sessionId = cookies.get('id');
    if (!sessionId) {
        throw redirect(307, '/login');
    } else {
        const utilisateur = await findOne({ id: sessionId });

        const paniers = await findAll({
            where: {
                utilisateur_id: sessionId,
                //panier.produit.dispo: 1, //true
            },
            include: [
                { model: Utilisateur, as: 'utilisateur' },
                { model: Produit, as: "produit",
                    include: [
                      { model: Type, as: "type" }
                    ]
                }
            ],
            order: [
                ['createdAt', 'ASC'] //Date d'ajout ordre croissant
            ]
        });
    
        return { paniers: paniers, utilisateur }
    }

}