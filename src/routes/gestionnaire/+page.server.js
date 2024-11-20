import { findAll as findAllEvenements } from '../../lib/db/controllers/Evenements.controller';
import { findAll as findAllUtilisateurs } from '../../lib/db/controllers/Utilisateurs.controller';
import { log } from '../../lib/outils/debug.js';

export async function load({params}) {
    const evenements = await findAllEvenements();
    const utilisateurs = await findAllUtilisateurs();
    utilisateurs.shift();
    return{evenements, utilisateurs};
}