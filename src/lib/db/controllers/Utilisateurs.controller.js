import { Utilisateur } from "../models/Utilisateur.model";
import { Role } from "../models/Role.model";
import { Ville } from "../models/Ville.model";
import { error } from "@sveltejs/kit";
/**
 * 
 *
 * @export
 * @async
 * @returns {Object}
 */
export async function findAll(){
    return  Utilisateur.findAll({
        include: [
            { model: Role, as: "role" },
            { model: Ville, as: "ville" }
        ],
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Aucun utilisateur à afficher")
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

export async function newUser(p_courriel, p_role_id, p_pwd) {
    try{
        const mail = await Utilisateur.findOne({where: {courriel: p_courriel}});
        if(mail)
            throw "Un Compte avec ce courriel existe déjà.";
         const resultat = await Utilisateur.create({
            courriel: p_courriel,
            role_id: p_role_id,
            pwd: p_pwd
        });
        return resultat.dataValues;
        }catch(error){
            throw error;
        }
}