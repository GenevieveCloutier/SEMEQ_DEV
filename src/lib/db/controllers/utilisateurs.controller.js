import { Utilisateur } from "../models/Utilisateur.model";
import { Role } from "../models/Role.model";
import { Ville } from "../models/Ville.model";
/**
 * 
 *
 * @export
 * @async
 * @returns {Object}
 */
export async function findAll(){
    return await Utilisateur.findAll({
        include: [
            { model: Role, as: "role" },
            { model: Ville, as: "ville" }
        ],
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Pas de résultat à afficher")
        }
        return resultat.map(utilisateur => ({
            ...utilisateur.dataValues,
            role: utilisateur.role ? utilisateur.role.dataValues : null,
            ville: utilisateur.ville ? utilisateur.ville.dataValues : null,
        }));
    })
    .catch((error)=>{
        throw error;
    });
}; 