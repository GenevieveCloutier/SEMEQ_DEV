import { findAll as findAllVilles} from '$lib/db/controllers/Villes.controller.js'; 
import { findAll as findAllRegions} from '$lib/db/controllers/Regions.controller.js'; 
import { Evenement } from "$lib/db/models/Evenement.model.js"
import { Ville } from "$lib/db/models/Ville.model";
import { Utilisateur } from "$lib/db/models/Utilisateur.model";
import { Region } from "$lib/db/models/Region.model";
import { Op } from "sequelize";


export async function load({params, cookies}){
    const villes = await findAllVilles();
    const regions = await findAllRegions();

    let dateDebut = new Date()
    //date actuelle moins 1 mois
    dateDebut.setMonth(dateDebut.getMonth() -1);

    //pour mettre le jour au premier du mois pour inclure toutes les dates du mois dans la recherche
    dateDebut.setDate(1);
    dateDebut = dateDebut.toISOString().split("T")[0]  + " 00:00:00.000 +00:00";

    let dateFin = new Date()
    //date actuelle plus 10 mois
    dateFin.setMonth(dateFin.getMonth() +10);

    //pour mettre le jour au dernier jour du mois pour inclure toutes les dates du mois dans la recherche
    //pas parfait car n'inclut pas les 30 et/ou 31 du dernier mois, mais ne plante pas si le dernier mois est février...
    dateFin.setDate(28);
    dateFin = dateFin.toISOString().split("T")[0] + " 00:00:00.000 +00:00";

   const events = await Evenement.findAll({
       where: {
           [Op.and]: 
            //afficher seulement les événements approuvés
             { approuve: 1},

            //dont les dates sont entre 1 mois de moins que le mois actuel et 10 mois de plus que le mois actuel
             [Op.or]:[
                { debut_even: { [Op.between]: [dateDebut, dateFin] } }, 
                { fin_even: { [Op.between]: [dateDebut, dateFin] } } 
             ]
           
         },
       include: [
           { model: Utilisateur, as: "utilisateur" },
           { model: Ville, as: "ville",
               include: [
                 { model: Region, as: "region" }
               ]
           }
       ]
   })

   let resultat = events.map(evenement => ({
       ...evenement.dataValues,
       utilisateur: evenement.utilisateur ? evenement.utilisateur.dataValues : null,
       ville: evenement.ville ? {
           ...evenement.ville.dataValues,
           region: evenement.ville.region ? evenement.ville.region.dataValues : null
       } : null
   }));
   


   const session = cookies.get('session');
   const role = cookies.get('role');
   return {villes:villes, regions:regions, evenements:resultat, session: session, role:role};
}
