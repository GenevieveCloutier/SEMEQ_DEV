import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Utilisateur } from './Utilisateur.model.js';
import { Produit } from './Produit.model.js';

export const Panier = sequelize.define("panier", {
    utilisateur_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Utilisateur,
            key: "id"
        },
        allowNull: true
    }, 
    produit_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Produit,
            key: "id"
        },
        allowNull: true
    }, 
});

Panier.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id', as: 'utilisateur' });
Utilisateur.hasMany(Panier, { foreignKey: 'utilisateur_id', as: 'paniers' });

Panier.belongsTo(Produit, { foreignKey: 'produit_id', as: 'produit' });
Produit.hasMany(Panier, { foreignKey: 'produit_id', as: 'paniers' });
