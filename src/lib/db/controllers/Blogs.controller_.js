import { Blog } from "../models/Blog.model.js";

/**
 * Va chercher tous les blogs
 *
 * @export
 * @async
 * @returns {Object}
 */
export async function findAll(){
    return await Blog.findAll().then(resultat => {
        return resultat.map(blogs => blogs.dataValues);
    })
    .catch((error)=>{
        throw error;
    });
};