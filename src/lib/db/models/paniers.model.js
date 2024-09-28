import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Utilisateurs } from './utilisateurs.model.js';
import { Produits } from './produits.model.js';

export const Paniers = sequelize.define("paniers", {
    utilisateur_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Utilisateurs,
            key: "id"
        },
        allowNull: true
    }, 
    produit_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Produits,
            key: "id"
        },
        allowNull: true
    }, 
});

Paniers.belongsTo(Utilisateurs, { foreignKey: 'utilisateur_id', as: 'utilisateur' });
Utilisateurs.hasMany(Paniers, { foreignKey: 'utilisateur_id', as: 'panier' });

Paniers.belongsTo(Produits, { foreignKey: 'produit_id', as: 'produit' });
Produits.hasMany(Paniers, { foreignKey: 'produit_id', as: 'panier' });

sequelize.sync().then(() => {
    console.log('Paniers table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : paniers', error);
});