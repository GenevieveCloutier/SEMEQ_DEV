import { findOne } from '$lib/db/controllers/Evenements.controller';
import { findAll as findAllVilles} from '$lib/db/controllers/Villes.controller.js'; 
import { findAll as findAllRegions} from '$lib/db/controllers/Regions.controller.js'; 
import { Ville } from "$lib/db/models/Ville.model";
import { Evenement } from "$lib/db/models/Evenement.model";
import { Region } from "$lib/db/models/Region.model";
import { Role } from "$lib/db/models/Role.model";
import { error } from '@sveltejs/kit';


export async function load({ params, cookies}){

    const paramId = params.id;
    const villes = await findAllVilles();
    const regions = await findAllRegions();
    const evenement = await findOne({ id: paramId });

    const role = cookies.get('role');
    const evenAbonne = evenement.utilisateur.abonne

    // Restriction accès page, si l'événement n'est pas abonné, l'afficher seulement si l"utilisateur est exposant ou gestionnaire
    if ((evenAbonne != true) && (role != "1" &&  role !== "3")) {
        throw error(403, 'Vous n`avez pas l`autorisation d`accéder à cette page.');
    }

    
    return {villes:villes, regions:regions, evenement:evenement, role:role};
}



