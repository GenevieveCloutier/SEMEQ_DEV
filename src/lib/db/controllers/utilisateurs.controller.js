import { Utilisateurs } from "../models/utilisateurs.model";
import { Roles } from "../models/roles.model";

/**
 * Va chercher tous les utilisateurs dont le statut n'est pas égal à supprime 
 *
 * @export
 * @async
 * @returns {Object}
 */
export async function findAll(){
    return await Utilisateurs.findAll({
        include: [
            { model: Roles, as: "role" }
        ],
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Pas de résultat à afficher")
        }
        return resultat.map(user => ({
            ...user.dataValues,
            role: user.role ? user.role.dataValues : null
        }));
    })
    .catch((error)=>{
        throw error;
    });
}