import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from '../db.js';
import { Roles } from './roles.model.js';
import { Villes } from './villes.model.js';
import { v4 as uuidv4 } from 'uuid';

export const Utilisateurs = sequelize.define('utilisateurs', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => uuidv4(),
      },
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
            model: Roles,
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
            model: Villes,
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
Utilisateurs.addHook('beforeCreate',(async (user, option) => {
    user.password = await bcrypt.hash(user.password, 10);
}));

//encrypter le MPD après modification
Utilisateurs.addHook('beforeUpdate',(async(user, option)=> {
    user.password = bcrypt.hashSync(user.password,10);
}));

Utilisateurs.belongsTo(Roles, { foreignKey: 'role_id', as: 'role' });
Roles.hasMany(Utilisateurs, { foreignKey: 'role_id', as: 'utilisateur' });

Utilisateurs.belongsTo(Villes, { foreignKey: 'ville_id', as: 'ville' });
Villes.hasMany(Utilisateurs, { foreignKey: 'villes_id', as: 'utilisateur' });

sequelize.sync().then(() => {
    console.log('Utilisateurs table created successfully!');
}).catch((error) => {
    console.error('Unable to create table utilisateurs: ', error);
});