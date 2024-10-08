import { Op } from "sequelize";
import { Evenement } from "../models/Evenement.model";
import { Utilisateur } from "../models/Utilisateur.model";
import { Ville } from "../models/Ville.model";
import { Region } from "../models/Region.model";
 
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
            
            { model: Ville, as: "ville" },
        ],
        include: [
            { model: Utilisateur, as: "utilisateur" },
            { model: Ville, as: "ville",
              include: [
                { model: Region, as: "region" }
              ]
            }
          ]
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Aucun evenement à afficher")
        }
        return resultat.map(evenement => ({
            ...evenement.dataValues,
            utilisateur: evenement.utilisateur ? evenement.utilisateur.dataValues : null,
            ville: evenement.ville ? {
                ...evenement.ville.dataValues,
                region: evenement.ville.region ? evenement.ville.region.dataValues : null
            } : null
        }));
    })
    .catch((error)=>{
        throw error;
    });
};