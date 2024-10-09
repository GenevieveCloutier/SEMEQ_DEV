import { Op } from "sequelize";
import { Evenement } from "$lib/db/models/Evenement.model.js"
import { Utilisateur } from "../../../lib/db/models/Utilisateur.model";
import { Ville } from "../../../lib/db/models/Ville.model";
import { Region } from "../../../lib/db/models/Region.model";

/**
 * Charge les détails des événements approuvés dont la date de fin des appels de candidatures est après la date du jour.
 * Si pas de dates de candidature, ne pas afficher à partir de la date de début de l'événement.
 * @param {Object} params - Les paramètres de la requête.
 * @returns {Object} - Les événements et leurs détails pour ceux ayant des appels de candidatures en cours.
 */
/*export async function load({ params }){
    //const aujourdhui = new Date().toISOString().split('T')[0];  // date du jour au format ISO sans l'heure

    const events = await findAll({
        where: {
            // événement approuvé
            approuve: true,
            // fin_cand a une date inférieure (avant) à date du jour ou fin_cand est null
            [Op.or]: [
                { fin_cand: { [Op.lt]: new Date() } },
                { fin_cand: null }
            ],
            // début_even a une date inférieure (avant) ou égale à date du jour
            debut_even: { [Op.lte]: new Date() }
        }
    });

    return { events: events }
}*/

export async function load({ params }){
    const events = await Evenement.findAll({
        where : {
            //approuve: false,
            fin_cand: { [Op.lt]: new Date() },
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

    let plop = events.map(evenement => ({
        ...evenement.dataValues,
        utilisateur: evenement.utilisateur ? evenement.utilisateur.dataValues : null,
        ville: evenement.ville ? {
            ...evenement.ville.dataValues,
            region: evenement.ville.region ? evenement.ville.region.dataValues : null
        } : null
    }));

    return { events: plop }
}