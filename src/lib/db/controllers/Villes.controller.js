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