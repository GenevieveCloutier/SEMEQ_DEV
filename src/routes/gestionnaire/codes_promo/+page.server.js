import { Partenaire } from "$lib/db/models/Partenaire.model";

export async function load({ params }){
    const codes = await Partenaire.findAll();

    let resultat = codes.map(code => ({
        ...code.dataValues,
        expiration: code.expiration === null ? "Aucune" : `${code.expiration.toLocaleDateString('fr-CA')}`,
    }));

    return { codes: resultat }
}