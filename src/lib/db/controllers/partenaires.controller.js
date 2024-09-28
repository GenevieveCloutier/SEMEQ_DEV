import { Partenaire } from "../models/Partenaire.model";

/**
 * Va chercher tous les partenaires
 *
 * @export
 * @async
 * @returns {Object}
 */
export async function findAll(){
    return await Partenaire.findAll().then(resultat => {
        return resultat.map(partenaire => partenaire.dataValues);
    })
    .catch((error)=>{
        throw error;
    });
}