import { Utilisateur } from "../models/Utilisateur.model";
import { Role } from "../models/Role.model";
import { Ville } from "../models/Ville.model";
import { error } from "@sveltejs/kit";
import bcrypt from 'bcrypt';
/**
 * 
 *
 * @export
 * @async
 * @returns {Object}
 */
export async function findAll(){
    return  Utilisateur.findAll({
        include: [
            { model: Role, as: "role" },
            { model: Ville, as: "ville" }
        ],
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Aucun utilisateur à afficher")
        }
        return resultat.map(utilisateur => ({
            ...utilisateur.dataValues,
            role: utilisateur.role ? utilisateur.role.dataValues : null,
            ville: utilisateur.ville ? utilisateur.ville.dataValues : null,
        }));
    })
    .catch((error)=>{
        throw error;
    });
};

export async function findOne(p_where){
    return await Utilisateur.findOne({ where: p_where, include: [{
        model: Role,
        as: 'role'
    }]})
    .then(res => {
        if(res)
        return {
            ...res.dataValues,
            role: res.role ? res.role.dataValues : null
        };
        else
            return null;
    }).catch((error) => {;
        throw error;
    });
}

export async function newUser(p_courriel, p_role_id, p_pwd) {
    try{
        const mail = await Utilisateur.findOne({where: {courriel: p_courriel}});
        if(mail)
            throw "Un Compte avec ce courriel existe déjà.";
         const resultat = await Utilisateur.create({
            courriel: p_courriel,
            role_id: p_role_id,
            pwd: p_pwd
        });
        return resultat.dataValues;
        }catch(error){
            throw error;
        }
}

export async function deleteUser(p_id) {
    try {
        const user = await Utilisateur.findByPk(p_id);
        if (!user)
            throw new Error('Utilisateur non trouvé');
        await user.destroy();
        return { message: 'Succès :Utilisateur supprimé' };
    } catch (error) {
        throw error;
    }
}

export async function authenticate(p_courriel, p_pwd){
    // console.log('dans auth ', p_courriel, p_pwd);
    
    try{

        const user = await findOne({ courriel: p_courriel});

        // console.log('apres le findone ', user);
        

        if(!user)
            throw "Utilisateur non trouvé";

        const goodPassword = await bcrypt.compare(p_pwd, user.pwd);
        // console.log('check pwd ', goodPassword);
        

        if(!goodPassword)
            throw "Mot de passe invalide";

       // console.log('controller = ', user);
        
        return user;

    }catch(error){
        throw error;
    }
}