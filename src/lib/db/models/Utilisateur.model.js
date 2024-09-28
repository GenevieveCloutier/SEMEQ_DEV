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
        type: DataTypes.BLOB,
        allowNull: true
    },
    site: {
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
    date_insc: {
        type: DataTypes.DATE,
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
});

//encrypter le MDP à la première utilisation
Utilisateur.addHook('beforeCreate',(async (user, option) => {
    user.password = await bcrypt.hash(user.password, 10);
}));

//encrypter le MPD après modification
Utilisateur.addHook('beforeUpdate',(async(user, option)=> {
    user.password = bcrypt.hashSync(user.password,10);
}));

Utilisateur.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
Role.hasMany(Utilisateur, { foreignKey: 'role_id', as: 'utilisateurs' });

Utilisateur.belongsTo(Ville, { foreignKey: 'ville_id', as: 'ville' });
Ville.hasMany(Utilisateur, { foreignKey: 'villes_id', as: 'utilisateurs' });

sequelize.sync().then(() => {
    console.log('Utilisateurs table created successfully!');
}).catch((error) => {
    console.error('Unable to create table utilisateurs: ', error);
});