
import { findAll as findAllVilles} from '$lib/db/controllers/Villes.controller.js'; 
import { findAll as findAllRegions} from '$lib/db/controllers/Regions.controller.js'; 
import { Ville } from "$lib/db/models/Ville.model";
import { Utilisateur } from "$lib/db/models/Utilisateur.model";
import { Region } from "$lib/db/models/Region.model";
import { Role } from "$lib/db/models/Role.model";
import { Op } from "sequelize";

//filtrer les utilisateurs pour envoyer seulement les exposants (role == 3) au front

export async function load({params, cookies}){
    const villes = await findAllVilles();
    const regions = await findAllRegions();

    const exposants = await Utilisateur.findAll({
        where: {
            //afficher seulement les utilisteurs qui sont exposants
              role_id: 3, 
          },
        include: [
            { model: Role, as: "role" },
            { model: Ville, as: "ville",
                include: [
                  { model: Region, as: "region" }
                ]
            }
        ]
    })

    let resultat = exposants.map(utilisateur => ({
        ...utilisateur.dataValues,
        role: utilisateur.role ? utilisateur.role.dataValues : null,
        ville: utilisateur.ville ? {
            ...utilisateur.ville.dataValues,
        region: utilisateur.ville.region ? utilisateur.ville.region.dataValues: null
        } : null
    }));
    


    const session = cookies.get('session');
    const role = cookies.get('role');

 
    return {villes:villes, regions:regions, exposants:resultat, session: session, role:role};
}