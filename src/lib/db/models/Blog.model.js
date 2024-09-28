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
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
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

// sequelize.sync().then(() => {
//     console.log('Blogs table created successfully!');
// }).catch((error) => {
//     console.error('Unable to create table : blogs ', error);
// });