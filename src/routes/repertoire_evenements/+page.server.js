import { findAll as findAllRegions} from '$lib/db/controllers/Regions.controller.js'; 
import { findAll as findAllEvenements } from "$lib/db/controllers/Evenements.controller";

export async function load({cookies}){
    const regions = await findAllRegions();   
    const evenements = await findAllEvenements();

    const session = cookies.get('session');
    const role = cookies.get('role');
 
    return {regions:regions, evenements:evenements, session: session, role:role}; //tous les utilisateurs

}