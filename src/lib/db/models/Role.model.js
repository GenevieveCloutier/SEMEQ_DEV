import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const Role = sequelize.define("role", {
    nom: {
        type: DataTypes.STRING,
        allowNull: true
    }
});
