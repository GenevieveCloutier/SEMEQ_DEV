import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Types } from './types.model.js';

export const Produits = sequelize.define("produits", {
    nom: {
        type: DataTypes.STRING,
        allowNull: true
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Types,
            key: "id"
        },
        allowNull: true
    }, 
    dispo: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    prix_v: {
        type: DataTypes.REAL,
        allowNull: true
    },
    prix_a: {
        type: DataTypes.REAL,
        allowNull: true
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

Produits.belongsTo(Types, { foreignKey: 'type_id', as: 'type' });
Types.hasMany(Produits, { foreignKey: 'type_id', as: 'produit' });

sequelize.sync().then(() => {
    console.log('Produits table created successfully!');
}).catch((error) => {
    console.error('Unable to create table produits: ', error);
});