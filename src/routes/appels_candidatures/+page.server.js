import { Op } from "sequelize";
import { findAll } from "$lib/db/controllers/Evenements.controller.js";

/**
 * Charge les détails des événements approuvés dont la date de fin des appels de candidatures est après la date du jour.
 * Si pas de dates de candidature, ne pas afficher à partir de la date de début de l'événement.
 * @param {Object} params - Les paramètres de la requête.
 * @returns {Object} - Les événements et leurs détails pour ceux ayant des appels de candidatures en cours
 *                     (si utilisateur exposant abonné connecté).
 */
export async function load({ params }){
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
}