import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Utilisateur } from './Utilisateur.model.js';

export const Session = sequelize.define("session", {
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Utilisateur,
            key: "id"
        },
        allowNull: false
    },
    uuid: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


Session.belongsTo(Utilisateur, { foreignKey: 'user_id', as: 'utilisateur' });
Utilisateur.hasMany(Session, { foreignKey: 'user_id', as: 'sessions' }); //Ca me fait bizarre ici, un utilisateur ne peux pas avoir plusieurs session
