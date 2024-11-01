
import { findAll as findAllVilles} from '$lib/db/controllers/Villes.controller.js'; 
import { findAll as findAllRegions} from '$lib/db/controllers/Regions.controller.js'; 
import { Evenement } from "$lib/db/models/Evenement.model.js"
import { Ville } from "$lib/db/models/Ville.model";
import { Utilisateur } from "$lib/db/models/Utilisateur.model";
import { Region } from "$lib/db/models/Region.model";
import { Op } from "sequelize";


export async function load({params, cookies}){
    const villes = await findAllVilles();
    const regions = await findAllRegions();

    const events = await Evenement.findAll({
        where: {
            //afficher les événements approuvés
              approuve: 1, 
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
    


    const session = cookies.get('session');
    const role = cookies.get('role');

 
    return {villes:villes, regions:regions, evenements:resultat, session: session, role:role};
}