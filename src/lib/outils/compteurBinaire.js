export const domaines = {
    'accessoires_sacs': 1,
    'agro-alimentaire': 2,
    'animaux': 4,
    'arts_visuels': 8,
    'bijoux_joaillerie': 16,
    'ceramique_poterie': 32,
    'decoration_interieure': 64,
    'ebenisterie': 128,
    'forgerie': 256,
    'jouets_loisirs': 512,
    'papeteries_livres': 1024,
    'photographies': 2048,
    'produits_corporels': 4096,
    'sculpture': 8192,
    'tricots_crochets': 16384,
    'verre_vitrail': 32768,
    'vetements_tous': 65536,
    'vetements_enfants': 131072,
    'zero_dechet': 262144,
    'autres': 524288
};

export const types = {
    'typeArtisan': 1,
    'typeAgro': 2,
    'typeMLM': 4,
    'typeAuteur': 8,
    'typeArt': 16,
}

export const verifs = {
    'verifNEQ': 1,
    'verifPermis': 2
}

export const emplacements = {
    "emplacementInterieur"  : 1,
    "emplacementExterieur"  : 2,
    "emplacementChapiteau"  : 4,
    "emplacementAbri"       : 8,
    "emplacementSansAbri"   : 16
};

/**
 * Récupère les clés correspondant aux bits activés dans p_nombre.
 *
 * @param {number} p_nombre - Le nombre dont les bits sont vérifiés.
 * @param {Object} p_constante - Un objet de mappage avec des clés et des valeurs de bits.
 * @return {Array<string>} resultat - Un tableau contenant les clés dont les bits sont activés.
 */
export function recupMappage(p_nombre, p_constante) {
    const resultat = [];
    for (const [cle, bit] of Object.entries(p_constante)) {
        if (p_nombre & bit) {
            resultat.push(cle);
        }
    }
    return resultat;
}

/**
 * Envoie le mappage des clés activées à leur valeur correspondante.
 *
 * @param {Map<string, boolean>} p_data - Un objet contenant des clés avec des valeurs booléennes.
 * @param {Object} p_constante - Un objet de mappage avec des clés et des valeurs.
 * @return {number} resultat - La somme des valeurs correspondant aux clés activées.
 */
export function envoieMappage(p_data, p_constante){
    let resultat = 0;

    for (const [cle, valeur] of Object.entries(p_constante)) {
        if (p_data.get(cle)) {
            resultat += valeur;
        }
    }
    return resultat;
}



// export function recupTypes(p_types) {
//     const resultat = [];
//     for (const [type, bit] of Object.entries(types)) {
//         if (p_types & bit) {
//             result.push(type);
//         }
//     }
//     return resultat;
// }

// export function envoieType(p_data){
//     let resultat = 0;

//     for (const [cle, valeur] of Object.entries(types)) {
//         if (p_data.get(cle)) {
//             resultat += valeur;
//         }
//     }
//     return resultat;
// }


// export function recupVerifs(p_verifs) {
//     const resultat = [];
//     for (const [verif, bit] of Object.entries(verifs)) {
//         if (p_verifs & bit) {
//             result.push(verif);
//         }
//     }
//     return resultat;
// }

// export function envoieVerif(p_data){
//     let resultat = 0;

//     for (const [cle, valeur] of Object.entries(types)) {
//         if (p_data.get(cle)) {
//             resultat += valeur;
//         }
//     }
//     return resultat;
// }

