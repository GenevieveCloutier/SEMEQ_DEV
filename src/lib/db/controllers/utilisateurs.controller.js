import { Utilisateurs } from "../models/utilisateurs.model";
import { Roles } from "../models/roles.model";
import { Villes } from "../models/villes.model";
/**
 * 
 *
 * @export
 * @async
 * @returns {Object}
 */
export async function findAll(){
    return await Utilisateurs.findAll({
        include: [
            { model: Roles, as: "role" },
            { model: Villes, as: "ville" }
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