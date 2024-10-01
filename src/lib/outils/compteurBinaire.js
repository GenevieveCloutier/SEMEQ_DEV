const domaines = {
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

export function recupDomaines(p_domaines) {
    const resultat = [];
    for (const [domaine, bit] of Object.entries(domaines)) {
        if (p_domaines & bit) {
            result.push(domaine);
        }
    }
    return resultat;
}

export function envoieDomaine(p_data){
    let resultat = 0;

    for (const [cle, valeur] of Object.entries(domaines)) {
        if (p_data.get(cle)) {
            resultat += valeur;
        }
    }
    return resultat;
}

