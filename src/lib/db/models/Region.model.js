import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const Region = sequelize.define("region", {
    nom: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
});
