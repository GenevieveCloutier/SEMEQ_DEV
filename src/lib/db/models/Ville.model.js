import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Region } from './Region.model.js';

export const Ville = sequelize.define("ville", {
    nom: {
        type: DataTypes.STRING,
        allowNull: true
    },
    region_id: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

Ville.belongsTo(Region, { foreignKey: 'region_id', as: 'region' });
Region.hasMany(Ville, { foreignKey: 'region_id', as: 'villes' });

// sequelize.sync().then(() => {
//     console.log('Villes table created successfully!');
// }).catch((error) => {
//     console.error('Unable to create table villes : ', error);
// });