import { Partenaire } from "$lib/db/models/Partenaire.model";

export async function load({ params }){
    let codes = await Partenaire.findAll();

    let aujourdhui = new Date().toLocaleDateString('fr-CA', {timeZone: 'UTC'})

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