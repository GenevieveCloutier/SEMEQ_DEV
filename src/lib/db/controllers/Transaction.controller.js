import { Op } from "sequelize";
import { log } from "../../outils/debug";
import { sequelize } from "../db";
import { Achat } from "../models/Achat.model";
import { Panier } from "../models/Panier.model";
import { Utilisateur } from "../models/Utilisateur.model";
import { fail } from "@sveltejs/kit";

export async function transactionPanier(data) {
    // const t = await sequelize.transaction();
    try{
        //Les Managed transactions de Sequelize se lance comme ca
    const transaction = await sequelize.transaction( async t => {
    //Pour avoir une liste des id de panier a supprimer
    const listePanier = (() => {
        let liste = [];
        data.paniers.forEach(x => {
            liste.push(x.id)
        });
        return liste;
    })();
    //Effaces les paniers (soft delete)
    await Panier.destroy({
        where: { id: { [Op.in]: listePanier } }
      }, { transaction: t });
    //Boucle de creation dans la table achat
    for (const panier of data.paniers) {
            await Achat.create({
            utilisateur_id:     panier.utilisateur_id,
            produit_id:         panier.produit_id ?? -1,
            prix:               data.abonne ? panier.produit.prix_a ?? panier.produit.prix : panier.produit.prix_v
        },
        {transaction: t}
        );
    }
    //Si c'est arriver jusque la sans erreur, ca commit la transaction.
    log("transaction reussie")
    return {
        status: 200,
        body: {
            message: 'Produit supprimé.',
        }
    };
})
}catch(error){
    //Si y'as eu une erreur, ca rollback
    log("erreur dans la transaction", error)
    return fail(401, error)
}
}