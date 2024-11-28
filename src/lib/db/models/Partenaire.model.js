import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Categorie } from './Categorie.model.js';

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
});

Partenaire.belongsTo(Categorie, { foreignKey: 'categorie_id', as: 'categorie' });
Categorie.hasMany(Partenaire, { foreignKey: 'categorie_id', as: 'partenaires' });