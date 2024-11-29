import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Categorie } from './Categorie.model.js';
import { Produit } from './Produit.model.js';
import { Type } from './Type.model.js';

export const Partenaire = sequelize.define("partenaire", {
    nom: {
        type: DataTypes.STRING,
        allowNull: true
    },
    avantage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rabais: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            min: 0.0,
            max: 100.0
        }
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    expiration: {
        type: DataTypes.DATE,
        allowNull: true
    },
    categorie_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Categorie,
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

Partenaire.belongsTo(Categorie, { foreignKey: 'categorie_id', as: 'categorie' });
Categorie.hasMany(Partenaire, { foreignKey: 'categorie_id', as: 'code_partenaires' });

Partenaire.belongsTo(Produit, { foreignKey: 'produit_id', as: 'produit' });
Produit.hasMany(Partenaire, { foreignKey: 'produit_id', as: 'code_produits' });

Partenaire.belongsTo(Type, { foreignKey: 'type_id', as: 'type' });
Type.hasMany(Partenaire, { foreignKey: 'type_id', as: 'code_types' });