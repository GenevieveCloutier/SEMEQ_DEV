import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const Role = sequelize.define("role", {
    nom: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

// sequelize.sync().then(() => {
//     console.log('Roles table created successfully!');
// }).catch((error) => {
//     console.error('Unable to create table : roles ', error);
// });