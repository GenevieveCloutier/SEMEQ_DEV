import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const Region = sequelize.define("region", {
    nom: {
        type: DataTypes.STRING,
        allowNull: true
    },
});
