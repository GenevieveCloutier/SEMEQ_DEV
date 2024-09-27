import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Utilisateurs } from './utilisateurs.model.js';
import { Villes } from './villes.model.js';

export const Evenements = sequelize.define("evenements", {
    nom: {
        type: DataTypes.STRING,
        allowNull: true
    },
    utilisateur_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Utilisateurs,
            key: "id"
        },
        allowNull: true
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: true
    },
    debut_even: {
        type: DataTypes.DATE,
        allowNull: true
    },
    horaire_even: {
        type: DataTypes.STRING,
        allowNull: true
    },
    debut_cand: {
        type: DataTypes.DATE,
        allowNull: true
    },
    fondation: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    nb_visiteur: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    nb_expo: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    profil: {
        type: DataTypes.STRING,
        allowNull: true
    },
    site: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fb_even: {
        type: DataTypes.STRING,
        allowNull: true
    },
    courriel: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ville_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Villes,
            key: "id"
        },
        allowNull: true
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: true
    },
    emplacement: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    criteres: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    domaine: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    photo_1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    photo_2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    photo_3: {
        type: DataTypes.STRING,
        allowNull: true
    },
    approuve: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
});

Evenements.belongsTo(Utilisateurs, { foreignKey: 'utilisateur_id', as: 'utilisateur' });
Utilisateurs.hasMany(Evenements, { foreignKey: 'utilisateur_id', as: 'evenement' });

Evenements.belongsTo(Villes, { foreignKey: 'ville_id', as: 'ville' });
Villes.hasMany(Evenements, { foreignKey: 'ville_id', as: 'evenement' });

sequelize.sync().then(() => {
    console.log('Evenements table created successfully!');
}).catch((error) => {
    console.error('Unable to create table evenement : ', error);
});