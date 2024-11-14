import bcrypt from 'bcrypt';
import { Utilisateur } from '../models/Utilisateur.model';
import { Session } from "../models/Session.model";
import { log } from '../../outils/debug';


/**
 * Crée des cookies de session, rôle et identifiant utilisateur, 
 * chacun avec une durée de vie d'un jour. Génére un UUID pour la session 
 * et l'enregistre dans la base de données.
 * 
 * Retourne les valeurs de la session créée.
 * 
 * @param {number} p_user_id - L'ID de l'utilisateur.
 * @param {Cookies} p_cookies - L'objet cookies utilisé pour définir les cookies.
 * @param {string} p_role - Le rôle de l'utilisateur.
 * 
 * @returns {Object} Les valeurs de la session créée.
 */
export async function createCookie(p_user_id, p_cookies, p_role)
{   
    let uuid = crypto.randomUUID();
    p_cookies.set('session', uuid, 
        {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 24
        }
    );
    p_cookies.set('role', p_role,
        {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 24
        }
    );
    p_cookies.set('id', p_user_id,
        {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 24
        }
    );
    Session.create({
        user_id: p_user_id,
        uuid: uuid
    })
    .then(resultat => {
        return resultat.dataValues;
    })
    .catch((error)=>{
        throw error;
    });
}


/**
 * Supprime les cookies de session et de rôle, puis supprime la session
 * correspondante de la base de données en fonction de l'UUID de session.
 * 
 * Retourne les valeurs de la session supprimée.
 * 
 * @param {Cookies} p_cookie - L'objet cookies utilisé pour accéder et supprimer les cookies.
 * 
 * @returns {Object} Les valeurs de la session supprimée.
 */
export async function deleteCookie(p_cookie)
{
    let uuid = p_cookie.get('session');
    p_cookie.delete('session', {path: '/'});
    p_cookie.delete('role', {path: '/'});
    Session.destroy({
        where:{uuid: uuid}
    }).then(resultat => {
        return resultat.dataValues;
    }).catch((error) => {
        throw error;
    });
}

/**
 * Trouve une session unique en fonction des conditions spécifiées,
 * et inclut les informations de l'utilisateur associé.
 * 
 * Retourne les valeurs de la session trouvée ainsi que celles de l'utilisateur, si disponible.
 * 
 * @param {Object} p_where - Les conditions utilisées pour rechercher la session.
 * 
 * @returns {Object} Les valeurs de la session trouvée et les données de l'utilisateur associé.
 */
export async function findOne(p_where){
    return await Session.findOne({ where: p_where, include: [{
        model: Utilisateur,
        as: 'utilisateur'
    }]})
    .then(res => {
        return {
            ...res.dataValues,
            user: res.user ? res.user.dataValues : null
        };
    }).catch((error) => {
        throw error;
    });
}