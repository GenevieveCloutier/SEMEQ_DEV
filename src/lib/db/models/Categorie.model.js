import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const Categorie = sequelize.define("categorie", {
    nom: {
        type: DataTypes.STRING,
        allowNull: true
    },
});
