import { PartenaireProduit } from "../models/PartenaireProduit.model";
import { Partenaire } from "../models/Partenaire.model";
import { Produit } from "../models/Produit.model";
import { Type } from "../models/Type.model";

/**
 * Récupère tous les PartenairesProduits avec les informations associées.
 *
 * Cette fonction retourne tous les PartenairesProduits présents dans la base de données,
 * avec leurs informations de partenaire, produit et de types associées, si disponibles.
 *
 * @return {Array<Object>} resultat - Un tableau d'objets PartenairesProduits avec les informations associés.
 *
 * @throws {Error} - Lance une erreur en cas de problème lors de la récupération.
 */
export async function findAll(){
    return  PartenaireProduit.findAll({
        include: [
            { model: Partenaire, as: "partenaire" },
            { model: Produit, as: "produit" },
            { model: Type, as: 'type' },
        ]
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Aucun PartenaireProduit à afficher")
        }
        return resultat.map(partenaireProduit => ({
            ...partenaireProduit.dataValues,
            partenaire: partenaireProduit.partenaire ? partenaireProduit.partenaire.dataValues : null,
            produit: partenaireProduit.produit ? partenaireProduit.produit.dataValues : null,
            type: partenaireProduit.type ? partenaireProduit.type.dataValues : null,
        }));
    })
    .catch((error)=>{
        throw error;
    });
};

/**
 * Trouve un PartenaireProduit selon les critères de recherche spécifiés.
 *
 * Cette fonction cherche un PartenaireProduit en fonction des critères passés dans `p_where`.
 * Elle inclut également les informations du partenaire, produit et type associé à l'utilisateur, si disponible.
 *
 * @param {Object} p_where - Critères de recherche pour trouver un utilisateur.
 *
 * @return {Object|null} res - L'objet PartenaireProduit avec son parteaire, produit et type associés, ou `null` si aucun n'est trouvé.
 *
 * @throws {Error} - Lance une erreur en cas de problème lors de la recherche.
 */
export async function findOne(p_where) {
	return await PartenaireProduit.findOne({
		where: p_where,
		include: [
			{ model: Partenaire, as: "partenaire" },
            { model: Produit, as: "produit" },
            { model: Type, as: 'type' },
		]
	})
		.then((res) => {
			if (res)
				return {
					...res.dataValues,
					partenaire: res.partenaire ? res.partenaire.dataValues : null,
                    produit: res.produit ? res.produit.dataValues : null,
                    type: res.type ? res.type.dataValues : null,
				};
			else return null;
		})
		.catch((error) => {
			throw error;
		});
}

/**
 * Crée un nouveau PartenaireProduit avec les informations fournies.
 *
 * Cette fonction vérifie d'abord si un partenaire avec le même produit ou le même type
 * existe déjà. Si ce n'est pas le cas, elle crée un nouveau PartenaireProduit avec
 * les informations passées en paramètres.
 *
 * @param {string} P_partenaire_id - ID du partenaire.
 * @param {string} p_produit_id - ID du produit.
 * @param {string} p_type_id - Id du type de produit.
 * 
 * @return {Object} resultat - Les données du PartenaireProduit nouvellement créé.
 * 
 * @throws {string} - "Ce partenaire existe déjà pour ce produit." si est déjà association partenaire/produit.
 * @throws {string} - "Ce partenaire existe déjà pour ce type de produit." si est déjà association partenaire/type.
 * @throws {Error} - Autre erreur lors de la création du PartenaireProduit.
 */
export async function newPartenaireProduit(p_partenaire_id, p_produit_id, p_type_id) {
	try {
        const doublonPartenaire = await findOne({partenaire_id: p_partenaire_id});
        const doublonProduit = await findOne({produit_id: p_produit_id});
        const doublonType = await findOne({type_id: p_type_id});
        if (doublonPartenaire && doublonProduit) throw "Ce partenaire (code promo) existe déjà pour ce produit.";
        if (doublonPartenaire && doublonType) throw "Ce partenaire (code promo) existe déjà pour ce type de produit.";

		const resultat = await PartenaireProduit.create({
			partenaire_id: p_partenaire_id,
			produit_id: p_produit_id,
			type_id: p_type_id
		});
		return resultat.dataValues;
	} catch (error) {
		throw error;
	}
}