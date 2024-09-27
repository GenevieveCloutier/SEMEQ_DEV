import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const Types = sequelize.define("types", {
    nom: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

sequelize.sync().then(() => {
    console.log('Types table created successfully!');
}).catch((error) => {
    console.error('Unable to create table types : ', error);
});