import { Ville } from "../models/Ville.model";
import { Region } from "../models/Region.model";
import csv from 'csvtojson';

export async function ajoutVilles(regions){
    const rows = await csv({delimiter: ';'}).fromFile('src/lib/db/villes.csv');
    console.log(regions);
    
} 