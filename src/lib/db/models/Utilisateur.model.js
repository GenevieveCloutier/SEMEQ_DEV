import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from '../db.js';
import { Role } from './Role.model.js';
import { Ville } from './Ville.model.js';

export const Utilisateur = sequelize.define('utilisateur', {
    nom: {
        type: DataTypes.STRING,
        allowNull: true
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: "id"
        },
        allowNull: true
    }, 
    entreprise: {
        type: DataTypes.STRING,
        allowNull: true
    },  
    neq: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    courriel: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pwd: {
        type: DataTypes.STRING,
        allowNull: true
    },
    site: {
        type: DataTypes.STRING,
        allowNull: true
    },
    insta: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tiktok: {
        type: DataTypes.STRING,
        allowNull: true
    },
    domaine: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ville_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Ville,
            key: "id"
        },
        allowNull: true
    },
    partage: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    affichage: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    abonne: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    fin_abo: {
        type: DataTypes.DATE,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: true
    },
    publique: {
        type: DataTypes.BOOLEAN,
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
    logo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    jeton: {
        type: DataTypes.STRING,
        allowNull: true
    },
    jetonExpiration: {
        type: DataTypes.DATE,
        allowNull: true
    },
},
    { paranoid: true }// Permet à sequelize de faire de la soft-deletion
);

//encrypter le MDP à la première utilisation
Utilisateur.addHook('beforeCreate',(async (user, option) => {
    user.pwd = await bcrypt.hash(user.pwd, 10);
}));



Utilisateur.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
Role.hasMany(Utilisateur, { foreignKey: 'role_id', as: 'utilisateurs_role' });

Utilisateur.belongsTo(Ville, { foreignKey: 'ville_id', as: 'ville' });
Ville.hasMany(Utilisateur, { foreignKey: 'ville_id', as: 'utilisateurs_ville' });
