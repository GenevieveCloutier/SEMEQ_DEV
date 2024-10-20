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


//! Fonction non final, creer seulement pour les test
export async function nouveauBillet(p_titre, p_article, p_image_1, p_image_2){
    try{
        const resultat = await Blog.create({
            titre: p_titre,
            article: p_article,
            date: new Date(),
            image_1: p_image_1,
            image_2: p_image_2
        });
        return resultat.dataValues;
    }catch(error){
        throw error;
    }
}