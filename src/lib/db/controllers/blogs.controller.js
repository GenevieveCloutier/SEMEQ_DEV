import { Blogs } from "../models/blogs.model.js";

/**
 * Va chercher tous les blogs
 *
 * @export
 * @async
 * @returns {Object}
 */
export async function findAll(){
    return await Blogs.findAll().then(resultat => {
        return resultat.map(blog => blog.dataValues);
    })
    .catch((error)=>{
        throw error;
    });
};