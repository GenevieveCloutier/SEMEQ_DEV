import { Partenaire } from "$lib/db/models/Partenaire.model";

export async function load({ params }){
    const codes = await Partenaire.findAll();

    let aujourdhui = new Date().toLocaleDateString('fr-CA', {timeZone: 'America/Montreal'});

    let resultat = codes.map(code => ({
        ...code.dataValues,
        expiration: code.expiration === null
            ? "Aucune"
            : code.expiration.toLocaleDateString('fr-CA', {timeZone: 'America/Montreal'}) < aujourdhui
                ? "Expiré"
                : code.expiration.toLocaleDateString('fr-CA', {timeZone: 'America/Montreal'}),
    }));

    return { codes: resultat }
}