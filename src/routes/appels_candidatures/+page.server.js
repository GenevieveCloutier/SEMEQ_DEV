import { findAll } from "$lib/db/controllers/Evenements.controller.js";
import { findAll as findVilles, findOne as findNomVille } from "$lib/db/controllers/Villes.controller.js";

/**
 * Charge les détails des événements approuvés dont la date d'aujourd'hui est comprise entre la date de début et
 * celle de fin des appels de candidatures des événements du répertoire.
 * @param {Object} params - Les paramètres de la requête.
 * @returns {Object} - Les événements et leurs détails pour ceux ayant des appels de candidatures en cours
 *                     (si utilisateur exposant abonné connecté).
 */
export async function load({ params }){
    const events = await findAll();
    const villes = await findVilles();
    let ville = null;
    for (const event of villes) {
        ville = await findNomVille({id: event.ville_id});
        event.ville = ville;
    }
    return { events:events }
}