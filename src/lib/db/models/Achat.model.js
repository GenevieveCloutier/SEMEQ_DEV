import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Utilisateur } from './Utilisateur.model.js';
import { Produit } from './Produit.model.js'

export const Achat = sequelize.define("achat", {
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
    prix: {
        type: DataTypes.REAL,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

Achat.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id', as: 'utilisateur' });
Utilisateur.hasMany(Achat, { foreignKey: 'utilisateur_id', as: 'achats' });

Achat.belongsTo(Produit, { foreignKey: 'produit_id', as: 'produit' });
Produit.hasMany(Achat, { foreignKey: 'produit_id', as: 'achats' });