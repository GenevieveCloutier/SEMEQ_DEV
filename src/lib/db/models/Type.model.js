import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const Type = sequelize.define("type", {
    nom: {
        type: DataTypes.STRING,
        allowNull: true
    },
});
