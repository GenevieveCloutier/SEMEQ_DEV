import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const Regions = sequelize.define("region", {
    nom: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
});

sequelize.sync().then(() => {
    console.log('Roles table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});