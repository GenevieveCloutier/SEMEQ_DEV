import { Achat } from "../models/Achat.model.js";
import { Utilisateur } from "../models/Utilisateur.model.js";
import { Produit } from "../models/Produit.model.js";

/**
 * Récupère tous les achats de la base de données.
 * 
 * @returns {Array} Un tableau d'objets représentant les achats, incluant les utilisateurs et les produits associés.
 */
export async function findAll(){
    return await Achat.findAll({
        include: [
            { model: Utilisateur, as: "utilisateur" },
            { model: Produit, as: "produit" }
        ],
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Aucun achat à afficher")
        }
        return resultat.map(achats => ({
            ...achats.dataValues,
            utilisateur: achats.utilisateur ? achats.utilisateur.dataValues : null,
            produit: achats.produit ? achats.produit.dataValues : null,
        }));
    })
    .catch((error)=>{
        throw error;
    });
};

/**
 * Trouve un produit selon les critères de recherche spécifiés.
 *
 * Cette fonction cherche un produit en fonction des critères passés dans `p_where`.
 * Elle inclut également les informations du produit et de l'utilisateur associé à l'achat.
 *
 * @param {Object} p_where - Critères de recherche pour trouver un achat.
 *
 * @return {Object|null} res - L'objet achat avec son produit et son utilisateur associés, ou `null` si aucun achat n'est trouvé.
 *
 * @throws {Error} - Lance une erreur en cas de problème lors de la recherche.
 */
export async function findOne(p_where){
    return await Achat.findOne({ where: p_where,
        include: [
            { model: Produit, as: 'produit' },
            { model: Utilisateur, as: 'utilisateur' }
        ]
    })
    .then(res => {
        if(res)
        return {
            ...res.dataValues,
            produit: res.produit ? res.produit.dataValues : null,
            utilisateur: res.utilisateur ? res.utilisateur.dataValues : null,
        };
        else
            return null;
    }).catch((error) => {;
        throw error;
    });
}