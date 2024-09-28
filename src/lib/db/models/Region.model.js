import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const Region = sequelize.define("region", {
    nom: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
});

sequelize.sync().then(() => {
    console.log('Region table created successfully!');
}).catch((error) => {
    console.error('Unable to create table region : ', error);
});