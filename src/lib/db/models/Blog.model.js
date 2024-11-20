import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const Blog = sequelize.define("blog", {
    titre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    article: {
        type: DataTypes.STRING,
        allowNull: true
    },
    //J'ai enlevé le champ date parceque Sequelize ajoute déjà automatiquement un champ date de création.
    image_1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // j'ai ajouté la deuxième image du blog, modifier le schéma BD si ce n'est pas fait :)
    image_2: {
        type: DataTypes.STRING,
        allowNull: true
    },
});
