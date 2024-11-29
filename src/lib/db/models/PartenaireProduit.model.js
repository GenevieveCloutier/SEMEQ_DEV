import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Partenaire } from './Partenaire.model.js';
import { Produit } from './Produit.model.js';
import { Type } from './Type.model.js';

export const PartenaireProduit = sequelize.define("partenaire_produit", {
    partenaire_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Partenaire,
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
    type_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Type,
            key: "id"
        },
        allowNull: true
    }
});

PartenaireProduit.belongsTo(Partenaire, { foreignKey: 'partenaire_id', as: 'partenaire' });
Partenaire.hasMany(PartenaireProduit, { foreignKey: 'partenaire_id', as: 'partenaire_produits' });

PartenaireProduit.belongsTo(Produit, { foreignKey: 'produit_id', as: 'produit' });
Produit.hasMany(PartenaireProduit, { foreignKey: 'produit_id', as: 'partenaire_produits' });

PartenaireProduit.belongsTo(Type, { foreignKey: 'type_id', as: 'type' });
Type.hasMany(PartenaireProduit, { foreignKey: 'type_id', as: 'partenaire_produits' });