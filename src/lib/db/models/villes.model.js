import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Regions } from './regions.model.js';

export const Villes = sequelize.define("villes", {
    nom: {
        type: DataTypes.STRING,
        allowNull: true
    },
    region_id: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

Villes.belongsTo(Regions, { foreignKey: 'region_id', as: 'region' });
Regions.hasMany(Villes, { foreignKey: 'region_id', as: 'region' });

sequelize.sync().then(() => {
    console.log('Villes table created successfully!');
}).catch((error) => {
    console.error('Unable to create table villes : ', error);
});