import { Op } from "sequelize";
import { log } from "../../outils/debug";
import { sequelize } from "../db";
import { Achat } from "../models/Achat.model";
import { Panier } from "../models/Panier.model";
import { Produit } from "../models/Produit.model";
import { Utilisateur } from "../models/Utilisateur.model";

export async function transactionPanier(data) {
    const t = await sequelize.transaction();
    try{
    // const utilisateur = await Utilisateur.findByPk(data.utilisateur.id);
    const paniers = (() => {
        let liste = [];
        data.paniers.forEach(x => {
            liste.push(x.id)
        });
        return liste;
    })();
    for (const panier of data.paniers) {
        const resultat = await Achat.create({
            utilisateur_id:     panier.utilisateur_id,
            produit_id:         panier.produit_id,
            prix:               data.abonne ? panier.produit.prix_a : panier.produit.prix_v
        },
        {transaction: t}
        );
    }
    await Panier.destroy({
        where: { id: { [Op.in]: paniers } }
      }, { transaction: t });

    await t.commit();
    log("transaction reussie")
}catch(error){
    log("erreur dans la transaction", error)
    await t.rollback();
}
    
    log("dans le controller utilisateur = ", utilisateur)
    log("dans le controller panier = ", paniers)
}