import { findOne } from '$lib/db/controllers/Utilisateurs.controller';
import { findAll as findAllVilles} from '$lib/db/controllers/Villes.controller.js'; 
import { findAll as findAllRegions} from '$lib/db/controllers/Regions.controller.js'; 
import { Ville } from "$lib/db/models/Ville.model";
import { Utilisateur } from "$lib/db/models/Utilisateur.model";
import { Region } from "$lib/db/models/Region.model";
import { Role } from "$lib/db/models/Role.model";
import { error } from '@sveltejs/kit';




    async function loadImage(photo, images) {
      if (images[photo]) {
        const module = await images[photo]();
        return module.default; // URL de l'image
      }
      return null;
    }

export async function load({ params}){

    const paramId = params.id;
    const villes = await findAllVilles();
    const regions = await findAllRegions();
    const exposant = await findOne({ id: paramId });

    const images = import.meta.glob('/src/lib/img/app/utilisateurs/*.{png,jpg,jpeg}');
    const test = await loadImage('/'+exposant.photo_1.replaceAll('\\','/'), images);


 
    return {villes:villes, regions:regions, exposant:exposant, test, images};
}



