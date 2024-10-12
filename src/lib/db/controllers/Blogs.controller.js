import { Blog } from "../models/Blog.model.js";

/**
 * Récupère tous les blogs de la base de données.
 * 
 * @returns {Array} Un tableau d'objets représentant les blogs.
 */
export async function findAll(){
    return await Blog.findAll().then(resultat => {
        return resultat.map(blogs => blogs.dataValues);
    })
    .catch((error)=>{
        throw error;
    });
};