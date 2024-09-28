import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const Type = sequelize.define("type", {
    nom: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

// sequelize.sync().then(() => {
//     console.log('Types table created successfully!');
// }).catch((error) => {
//     console.error('Unable to create table types : ', error);
// });