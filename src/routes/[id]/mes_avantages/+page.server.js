import { error } from '@sveltejs/kit';
import { Op } from "sequelize";
import { Partenaire } from "$lib/db/models/Partenaire.model";

export async function load({ params }){
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