import { Evenement } from "../models/Evenement.model";
import { Utilisateur } from "../models/Utilisateur.model";
import { Ville } from "../models/Ville.model";
 
/**
 * 
 *
 * @export
 * @async
 * @returns {Object}
 */
export async function findAll(){
    return await Evenement.findAll({
        include: [
            { model: Utilisateur, as: "utilisateur" },
            { model: Ville, as: "ville" }
        ],
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Pas de résultat à afficher")
        }
        return resultat.map(evenement => ({
            ...evenement.dataValues,
            utilisateur: evenement.utilisateur ? evenement.utilisateur.dataValues : null,
            ville: evenement.ville ? evenement.ville.dataValues : null
        }));
    })
    .catch((error)=>{
        throw error;
    });
}; 