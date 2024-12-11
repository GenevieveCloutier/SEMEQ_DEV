import { error, redirect } from '@sveltejs/kit';
import { findOne } from '$lib/db/controllers/Utilisateurs.controller';
import { findAll as findAllVilles } from "$lib/db/controllers/Villes.controller";
import { log } from '../../lib/outils/debug.js';


async function loadImage(photo, images) {
    if (images[photo]) {
      const module = await images[photo]();
      return module.default; // URL de l'image
    }
    return null;
  }

export async function load({ cookies, params }){
    // Récupérer user_id de la session
    const cookiesId = cookies.get('id');
    if (!cookiesId) {
        throw redirect(307, '/connexion');
    }

    const paramId = params.id;

    const user = await findOne({ id: paramId });
    if (!user) {
        throw error(404, 'Utilisateur non trouvé.');
    }

    const images = import.meta.glob('/src/lib/img/app/utilisateurs/*.{png,jpg,jpeg}');
    const test = await loadImage('/'+user.photo_1.replaceAll('\\', '/'), images);
    console.log(user.photo_1.replaceAll('\\', '/'));
    
    console.log(test);
    console.log(images);
    
    

    if (paramId != cookiesId)
        redirect(307, '/');
    const villes = await findAllVilles();
    return { user:user, villes };
}