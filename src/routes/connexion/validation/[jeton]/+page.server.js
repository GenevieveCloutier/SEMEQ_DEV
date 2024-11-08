import { findOne } from '../../../../lib/db/controllers/Utilisateurs.controller.js';
import { Utilisateur } from '../../../../lib/db/models/Utilisateur.model.js';
import { erreur } from '../../../../lib/outils/formHandlers.js';


export async function load({ params, cookies}){
    const paramJeton = params.jeton;
    if(!paramJeton)
        erreur.set('Ce lien de réinitialisation n\'est plus valide, veuillez recommencer une demande');
    const utilisateur = await findOne({jeton: paramJeton});
    
    if(!utilisateur || new Date(utilisateur.jetonExpiration).getTime() < Date.now())
        erreur.set('Ce lien de réinitialisation n\'est plus valide, veuillez recommencer une demande')
    return {utilisateur};
}