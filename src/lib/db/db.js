// import { Sequelize } from 'sequelize';
// export const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './database.sqlite',
//     logging: false
// });

// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }


import { Sequelize, DataTypes } from 'sequelize';

// Configuration de Sequelize pour SQLite
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // Chemin vers le fichier SQLite
    logging: false,
});

// Vérification de la connexion à la base de données
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection établie avec succès.');

        // Initialisation des tables si elles n'existent pas
        //await initializeDatabase();
    } catch (error) {
        console.error('Inpossible de connecter à la base de données:', error);
    }
})();

// Fonction pour initialiser la base de données
// async function initializeDatabase() {
//     // Exemple de modèle Sequelize pour la table "test"
//     const Test = sequelize.define('Test', {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//     });

//     // Synchronisation avec la base de données
//     await Test.sync({ alter: true }); // Utilisez `{ force: true }` si vous voulez recréer la table
//     console.log('Database has been initialized and table "Test" is ready.');
// }
