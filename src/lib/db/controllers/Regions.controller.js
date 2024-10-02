import { Region } from "../models/Region.model";

export async function ajoutRegions(){
    const regions = [
        "Bas-Saint-Laurent (01)",
        "Saguenay--Lac-Saint-Jean (02)",
        "Capitale-Nationale (03)",
        "Mauricie (04)",
        "Estrie (05)",
        "Montréal (06)",
        "Outaouais (07)",
        "Abitibi-Témiscamingue (08)",
        "Côte-Nord (09)",
        "Nord-du-Québec (10)",
        "Gaspésie--Îles-de-la-Madeleine (11)",
        "Chaudière-Appalaches (12)",
        "Laval (13)",
        "Lanaudière (14)",
        "Laurentides (15)",
        "Montérégie (16)",
        "Centre-du-Québec (17)"
      ];
      for await (const region of regions) {
        await Region.create({nom: region});
      }
      console.log('Regions créées');
      
}