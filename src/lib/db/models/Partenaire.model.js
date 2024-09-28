import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const Partenaire = sequelize.define("partenaires", {
    nom: {
        type: DataTypes.STRING,
        allowNull: true
    },
    avantage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    expiration: {
        type: DataTypes.DATE,
        allowNull: true
    },
});

sequelize.sync().then(() => {
    console.log('Partenaires table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : partenaires', error);
});