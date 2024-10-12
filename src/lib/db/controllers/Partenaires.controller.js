import { Partenaire } from "../models/Partenaire.model";

/**
 * Récupère tous les partenaires de la base de données.
 * 
 * Retourne un tableau contenant les valeurs de chaque partenaire trouvé.
 * 
 * @returns {Array<Object>} Un tableau des valeurs de chaque partenaire.
 */
export async function findAll(){
    return await Partenaire.findAll().then(resultat => {
        return resultat.map(partenaire => partenaire.dataValues);
    })
    .catch((error)=>{
        throw error;
    });
}