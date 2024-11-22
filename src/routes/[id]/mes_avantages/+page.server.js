import { error } from '@sveltejs/kit';
import { Op } from "sequelize";
import { Partenaire } from "$lib/db/models/Partenaire.model";
import { findOne } from '$lib/db/controllers/Utilisateurs.controller';

export async function load({ cookies, params }){
    const cookiesId = cookies.get('id');
    const user = await findOne({ id: cookiesId });
    let abonne = user.abonne;

    // Restriction accès page aux abonnés
    if (abonne !== true) {
        throw error(403, 'Seuls les abonnés peuvent accéder à cette page.');
    }

    let aujourdhui = new Date().toLocaleDateString('fr-CA', {timeZone: 'America/Montreal'});

    let partenaires = await Partenaire.findAll({
        where: {
            [Op.or]: [
                { expiration: { [Op.gte]: aujourdhui } },  // Date supérieure (après) ou égale à aujourd'hui
                { expiration: null }
            ]
        }
    });

    let resultat = partenaires.map(partenaire => ({
        ...partenaire.dataValues,
        expiration: partenaire.expiration === null ? "Aucune"
            : partenaire.expiration.toLocaleDateString('fr-CA', {timeZone: 'America/Montreal'}),
    }));

    return { partenaires : resultat }
}