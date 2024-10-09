import { Ville } from "../models/Ville.model";
import { Region } from "../models/Region.model";
import csv from 'csvtojson';

export async function ajoutVilles(regions){
    const rows = await csv({delimiter: ';'}).fromFile('src/lib/db/villes.csv');
    console.log(regions);
    for await (const row of rows) {
        try{
            await Ville.create(
                {
                    nom: row.munnom,
                    region_id: regions.indexOf(row.regadm) + 1
                }
            );
        }catch(error){
            console.log(error);
            
        }
    }
    console.log('Villes ajoutées');
} 
//est ce qu'on rajoute une verife au cas ou? ou un drop table ? a discuter

/**
 * Récupère toutes les villes.
 *
 * @export
 * @async
 * @returns {Object} Liste des villes.
 */
export async function findAll(){
    return  Ville.findAll({
        include: [
            { model: Region, as: "region" }
        ],
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Aucune ville à afficher")
        }
        return resultat.map(ville => ({
            ...ville.dataValues,
            region: ville.region ? ville.region.dataValues : null
        }));
    })
    .catch((error)=>{
        throw error;
    });
};