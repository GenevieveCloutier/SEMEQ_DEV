import { error } from '@sveltejs/kit';
import { Op } from "sequelize";
import { Evenement } from "$lib/db/models/Evenement.model.js"
import { Utilisateur } from "$lib/db/models/Utilisateur.model";
import { Ville } from "$lib/db/models/Ville.model";
import { Region } from "$lib/db/models/Region.model";
import { findOne } from '$lib/db/controllers/Utilisateurs.controller';

import { findAll as findAllVilles} from '$lib/db/controllers/Villes.controller.js'; 
import { findAll as findAllRegions} from '$lib/db/controllers/Regions.controller.js'; 

/**
 * Charge les détails des événements approuvés dont la date de début des appels de candidatures est aujourd'hui ou passée et
 * la date de fin des appels de candidatures est aujourd'hui ou dans le futur.
 * @param {Object} params - Les paramètres de la requête.
 * @returns {Object} - Les événements et leurs détails pour ceux ayant des appels de candidatures en cours.
 */
export async function load({ cookies, params }){
    const role = cookies.get('role');
    const cookiesId = cookies.get('id');
    const user = await findOne({ id: cookiesId });
    let abonne = user.abonne;

    // Restriction accès page à exposant abonné ou admin
    if (role !== '1' && (role === '3' && abonne !== true)) {
        throw error(403, 'Seuls les exposants abonnés peuvent accéder à cette page.');
    }

    // Récupérer toutes les régions et villes pour filtrage
    const regions = await findAllRegions();
    const villes = await findAllVilles();

    // Date du jour au format ISO avec l'heure 00:00:00 +00:00 pour comparer avec dates dans BD
    let aujourdhui = new Date().toISOString().split("T")[0]  + " 00:00:00.000 +00:00"; 

    const events = await Evenement.findAll({
        order: [
            ['fin_cand', 'ASC']
          ],
        where: {
            [Op.and]: [
              { approuve: 1 }, //true
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
        debut_even: evenement.debut_even === null ? "Inconnue" : `${evenement.debut_even.toLocaleDateString('fr-CA', {timeZone: 'UTC'})}`,
        fin_even: evenement.fin_even === null ? "Inconnue" : `${evenement.fin_even.toLocaleDateString('fr-CA', {timeZone: 'UTC'})}`,
        fin_cand: `${evenement.fin_cand.toLocaleDateString('fr-CA', {timeZone: 'UTC'})}`,
        utilisateur: evenement.utilisateur ? evenement.utilisateur.dataValues : null,
        ville: evenement.ville ? {
            ...evenement.ville.dataValues,
            region: evenement.ville.region ? evenement.ville.region.dataValues : null
        } : null
    }));

    return { events: resultat, regions: regions, villes: villes }
}