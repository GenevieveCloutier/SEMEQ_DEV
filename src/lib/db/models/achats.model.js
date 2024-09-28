import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Utilisateurs } from './utilisateurs.model.js';
import { Produits } from './produits.model.js'

export const Achats = sequelize.define("achats", {
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
    prix: {
        type: DataTypes.REAL,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

Achats.belongsTo(Utilisateurs, { foreignKey: 'utilisateur_id', as: 'utilisateur' });
Utilisateurs.hasMany(Achats, { foreignKey: 'utilisateur_id', as: 'achat' });

Achats.belongsTo(Produits, { foreignKey: 'produit_id', as: 'produit' });
Produits.hasMany(Achats, { foreignKey: 'produit_id', as: 'achat' });

sequelize.sync().then(() => {
    console.log('Achats table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : achats', error);
});