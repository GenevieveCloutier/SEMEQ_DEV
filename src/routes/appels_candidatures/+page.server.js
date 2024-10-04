import { Op } from "sequelize";
import { findAll } from "$lib/db/controllers/Evenements.controller.js";

/**
 * Charge les détails des événements approuvés dont la date d'aujourd'hui est comprise entre la date de début et
 * celle de fin des appels de candidatures des événements du répertoire.
 * Si pas de date de début de candidature dès que l'événement est approuvé.
 * Si pas de date de fin de candidature, retirer dès la date de début de l'événement.
 * @param {Object} params - Les paramètres de la requête.
 * @returns {Object} - Les événements et leurs détails pour ceux ayant des appels de candidatures en cours
 *                     (si utilisateur exposant abonné connecté).
 */
export async function load({ params }){
    const aujourdhui = new Date().toISOString().split('T')[0];  // date du jour au format ISO (AAAA-MM-JJ) sans l'heure
    const events = await findAll({
        where: {
            debut_cand: {
                [Op.lte]: aujourdhui // debut_cand inférieur ou égal à date du jour
            },
            fin_cand: {
                [Op.gte]: aujourdhui // fin_cand supérieur ou égal à date du jour
            }
        }
    });

    return { events: events }
}