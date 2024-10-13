import { Ville } from "../models/Ville.model";
import { Region } from "../models/Region.model";
import csv from 'csvtojson';

/**
 * Ajoute des villes à la base de données en les lisant depuis un fichier CSV.
 * Associe chaque ville à une région en utilisant l'indice de celle-ci dans la liste des régions.
 * 
 * @param {Array<string>} regions - Un tableau des noms des régions.
 * 
 * @returns {void}
 */
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
 * Récupère toutes les villes de la base de données en incluant les informations de leur région.
 * 
 * Retourne un tableau contenant les valeurs de chaque ville ainsi que celles de la région associée.
 * 
 * @returns {Array<Object>} Un tableau des valeurs de chaque ville et des données de la région associée.
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