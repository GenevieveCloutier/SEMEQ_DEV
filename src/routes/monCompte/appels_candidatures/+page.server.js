import { Op } from "sequelize";
import { Evenement } from "$lib/db/models/Evenement.model.js"
import { Utilisateur } from "../../../lib/db/models/Utilisateur.model";
import { Ville } from "../../../lib/db/models/Ville.model";
import { Region } from "../../../lib/db/models/Region.model";

/**
 * Charge les détails des événements approuvés dont la date de début des appels de candidatures est aujourd'hui ou passée et
 * la date de fin des appels de candidatures est aujourd'hui ou dans le futur.
 * @param {Object} params - Les paramètres de la requête.
 * @returns {Object} - Les événements et leurs détails pour ceux ayant des appels de candidatures en cours.
 */
export async function load({ params }){
    let aujourdhui = new Date().toISOString().split('T')[0] + 'T00:00:00.000Z'; // date du jour au format ISO avec l'heure 00:00:00

    const events = await Evenement.findAll({
        where: {
            [Op.and]: [
              { approuve: 1}, //true
              { debut_cand: { [Op.lte]: aujourdhui } }, // Date inférieure (avant) ou égale à aujourd'hui
              { fin_cand: { [Op.gte]: aujourdhui } },  // Date supérieure (après) ou égale à aujourd'hui
            ],
          },
        include: [
            { model: Utilisateur, as: "utilisateur" },
            { model: Ville, as: "ville",
                include: [
                  { model: Region, as: "region" }
                ]
            }
        ]
    })

    let resultat = events.map(evenement => ({
        ...evenement.dataValues,
        utilisateur: evenement.utilisateur ? evenement.utilisateur.dataValues : null,
        ville: evenement.ville ? {
            ...evenement.ville.dataValues,
            region: evenement.ville.region ? evenement.ville.region.dataValues : null
        } : null
    }));

    return { events: resultat }
}