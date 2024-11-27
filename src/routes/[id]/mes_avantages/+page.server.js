import { error } from '@sveltejs/kit';
import { Op } from "sequelize";
import { Partenaire } from "$lib/db/models/Partenaire.model";
import { Categorie } from "$lib/db/models/Categorie.model.js"
import { findOne } from '$lib/db/controllers/Utilisateurs.controller';

export async function load({ cookies, params }){
    const cookiesId = cookies.get('id');
    const user = await findOne({ id: cookiesId });
    let abonne = user.abonne;

    // Restriction accès page aux abonnés
    if (abonne !== true) {
        throw error(403, 'Seuls les abonnés peuvent accéder à cette page.');
    }

    // Date du jour au format ISO avec l'heure 00:00:00 +00:00 pour comparer avec dates dans BD
    let aujourdhui = new Date().toISOString().split("T")[0]  + " 00:00:00.000 +00:00";

    let partenaires = await Partenaire.findAll({
        order: [
            ['categorie_id', 'ASC']
          ],
        where: {
            [Op.or]: [
                { expiration: { [Op.gte]: aujourdhui } },  // Date supérieure (après) ou égale à aujourd'hui
                { expiration: null }
            ]
        },
        include: [
            { model: Categorie, as: "categorie" },
        ]
    });

    let resultat = partenaires.map(partenaire => ({
        ...partenaire.dataValues,
        expiration: partenaire.expiration === null ? "Aucune"
            : partenaire.expiration.toLocaleDateString('fr-CA', {timeZone: 'UTC'}),
        categorie: partenaire.categorie ? partenaire.categorie.dataValues : null,
    }));

    return { partenaires : resultat }
}