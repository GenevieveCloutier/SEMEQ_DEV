import { Evenements } from "../models/evenements.model";
import { Utilisateurs } from "../models/utilisateurs.model";
import { Villes } from "../models/villes.model";

/**
 * 
 *
 * @export
 * @async
 * @returns {Object}
 */
export async function findAll(){
    return await Evenements.findAll({
        include: [
            { model: Utilisateurs, as: "utilisateur" },
            { model: Villes, as: "ville" }
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