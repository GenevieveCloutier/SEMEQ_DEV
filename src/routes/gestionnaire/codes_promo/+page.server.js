import { Partenaire } from "$lib/db/models/Partenaire.model";

export async function load({ params }){
    const codes = await Partenaire.findAll();

    let aujourdhui = new Date().toLocaleDateString('fr-CA', {timeZone: 'UTC'});

    /*let resultat = codes.map(code => ({
        ...code.dataValues,
        expiration: code.expiration === null ? "Aucune" : `${code.expiration.toLocaleDateString('fr-CA')}`,
    }));*/

    let resultat = codes.map(code => ({
        ...code.dataValues,
        expiration: code.expiration === null
            ? "Aucune"
            : code.expiration.toLocaleDateString('fr-CA', {timeZone: 'UTC'}) < aujourdhui
                ? "Expiré"
                : code.expiration.toLocaleDateString('fr-CA', {timeZone: 'UTC'}),
    }));

    return { codes: resultat }
}