import { findAll } from "$lib/db/controllers/Evenements.controller.js";

/**
 * Charge les détails des événements dont la date d'aujourd'hui est comprise entre la date de début et
 * celle de fin des appels de candidatures des événements du répertoire.
 * @param {Object} params - Les paramètres de la requête.
 * @returns {Object} - Les événements et leurs détails pour ceux ayant des appels de candidatures en cours
 *                     (si utilisateur exposant abonné connecté).
 */
export async function load({params, /*cookies*/}) {
    const events = await findAll();
    return { events:events }
}