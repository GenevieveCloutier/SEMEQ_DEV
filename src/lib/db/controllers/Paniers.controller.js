import { Panier } from "../models/Panier.model";
import { Utilisateur } from "../models/Utilisateur.model";
import { Produit } from "../models/Produit.model";
import { Type } from "../models/Type.model";

/**
 * Récupère tous les paniers de la base de données en incluant les informations de l'utilisateur et du produit associés.
 * 
 * Retourne un tableau contenant les valeurs de chaque panier ainsi que celles de l'utilisateur et du produit associés.
 * 
 * @returns {Array<Object>} Un tableau des valeurs de chaque panier et des données de l'utilisateur et du produit associés.
 */
export async function findAll(){
    return await Panier.findAll({
        include: [
            { model: Utilisateur, as: "utilisateur" },
            { model: Produit, as: "produit",
                include: [
                  { model: Type, as: "type" }
                ]
            }
        ],
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Aucun panier à afficher")
        }
        return resultat.map(panier => ({
            ...panier.dataValues,
            utilisateur: panier.utilisateur ? panier.utilisateur.dataValues : null,
            produit: panier.produit ? {
                ...panier.produit.dataValues,
                type: panier.produit.type ? panier.produit.type.dataValues : null
            } : null
        }));
    })
    .catch((error)=>{
        throw error;
    });
};

/**
 * Récupère tous les produits dans un panier spécifique.
 * @param {Object} p_where - Conditions de filtrage pour le panier.
 * @returns {Object[]} - Liste des données des produits dans le panier.
 */
export async function findAllInCart(p_where){
    return await Panier.findAll({
        where: p_where,
        include: [
            { model: Utilisateur, as: "utilisateur" },
            { model: Produit, as: "produit",
                include: [
                  { model: Type, as: "type" }
                ]
            }
        ],
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Aucun panier à afficher")
        }
        return resultat.map(panier => ({
            ...panier.dataValues,
            utilisateur: panier.utilisateur ? panier.utilisateur.dataValues : null,
            produit: panier.produit ? {
                ...panier.produit.dataValues,
                type: panier.produit.type ? panier.produit.type.dataValues : null
            } : null
        }));
    })
    .catch((error)=>{
        throw error;
    });
}

/**
 * Trouve un panier selon les critères de recherche spécifiés.
 *
 * Cette fonction cherche un panier en fonction des critères passés dans `p_where`.
 * Elle inclut également les informations du produit et de l'utilisateur associé au panier, si disponible.
 *
 * @param {Object} p_where - Critères de recherche pour trouver un panier.
 *
 * @return {Object|null} res - L'objet panier avec son produit et son utilisateur associés, ou `null` si aucun panier n'est trouvé.
 *
 * @throws {Error} - Lance une erreur en cas de problème lors de la recherche.
 */
export async function findOne(p_where){
    return await Panier.findOne({
        where: p_where,
        include: [
            { model: Utilisateur, as: "utilisateur" },
            { model: Produit, as: "produit",
                include: [
                  { model: Type, as: "type" }
                ]
            }
        ],
    })
    .then(res => {
        if(res)
        return {
            ...res.dataValues,
            utilisateur: res.utilisateur ? res.utilisateur.dataValues : null,
            produit: res.produit ? {
                ...res.produit.dataValues,
                type: res.produit.type ? res.produit.type.dataValues : null
            } : null
        };
        else
            return null;
    }).catch((error) => {;
        throw error;
    });
}

/**
 * Supprime les entrées dans la table paniers en fonction des conditions spécifiées.
 * @param {Object} p_where - Conditions de suppression.
 * @returns {Object} - Message de succès.
 */
export async function deleteCart(p_where){
    return await Panier.destroy({ where: p_where })
    .then(res => {
        return {message: "Succès suppression panier."};
    }).catch((error) => {
        throw error;
    });
}

/**
 * Crée un nouveau panier avec les informations fournies.
 *
 * Cette fonction vérifie d'abord si le produit est déjà présent
 * dans un panier pour l'utilisateur. Si ce n'est pas le cas, elle crée
 * un nouveau panier avec les informations passées en paramètres.
 * 
 *
 * @param {number} p_utilisateur_id - ID de l'utilisateur.
 * @param {number} p_produit_id - ID du produit.
 *
 * @return {Object} resultat - Les données du panier nouvellement créé.
 * @throws {string} - "Ce produit est déjà dans votre panier." si le produit est déjà dans un panier avec le même id_utilisateur.
 * @throws {Error} - Autre erreur lors de la création du panier.
*/
export async function ajoutProduitPanier(p_utilisateur_id, p_produit_id) {
    try{
        const panierExistant = await Panier.findOne({
            where: {
                utilisateur_id: p_utilisateur_id,
                produit_id: p_produit_id
            }
        });
        if (panierExistant) {
            throw "Ce produit est déjà dans votre panier.";
        }

        const resultat = await Panier.create({
            utilisateur_id:     p_utilisateur_id,
            produit_id:         p_produit_id
        });
        return resultat.dataValues;
        }catch(error){
            throw error;
    }
}