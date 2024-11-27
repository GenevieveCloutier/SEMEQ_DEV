import { Partenaire } from "$lib/db/models/Partenaire.model";

export async function load({ params }){
    let codes = await Partenaire.findAll();

    // Date du jour au format ISO avec l'heure 00:00:00 +00:00 pour comparer avec dates dans BD
    let aujourdhui = new Date().toISOString().split("T")[0]  + " 00:00:00.000 +00:00";

    let resultat = codes.map(code => ({
        ...code.dataValues,
        expiration: code.expiration === null
            ? "Aucune"
            : code.expiration.toLocaleDateString('fr-CA', {timeZone: 'UTC'}) < aujourdhui
                ? "Expiré"
                : code.expiration.toLocaleDateString('fr-CA', {timeZone: 'UTC'}),
    }));

    return { resultat }
}