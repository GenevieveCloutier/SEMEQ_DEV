import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Type } from './type.model.js';

export const Produit = sequelize.define("produit", {
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
            model: Type,
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

Produit.belongsTo(Type, { foreignKey: 'type_id', as: 'type' });
Type.hasMany(Produit, { foreignKey: 'type_id', as: 'produits' });

sequelize.sync().then(() => {
    console.log('Produits table created successfully!');
}).catch((error) => {
    console.error('Unable to create table produits: ', error);
});