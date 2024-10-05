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
//Faudras mettre a jour avec les autres champs une fois connus
export async function newUser(p_nom,p_prenom, p_role_id, p_entreprise, p_neq, p_courriel, p_pwd, p_site, p_insta, p_tiktok, p_domaine,
                                p_ville_id, p_partage, p_affichage, p_abonne, p_fin_abo, p_description, p_adresse, p_publique,
                                p_photo_1, p_photo_2, p_photo_3, p_logo) {
    try{
        const mail = await Utilisateur.findOne({where: {courriel: p_courriel}});
        if(mail)
            throw "Un Compte avec ce courriel existe déjà.";
         const resultat = await Utilisateur.create({
            nom:            p_nom,
            prenom:         p_prenom,
            role_id:        p_role_id,
            entreprise:     p_entreprise,
            neq:            p_neq,
            courriel:       p_courriel,
            pwd:            p_pwd,
            site:           p_site,
            insta:          p_insta,
            tiktok:         p_tiktok,
            domaine:        p_domaine,
            ville_id:       p_ville_id,
            partage:        p_partage,
            affichage:      p_affichage,
            abonne:         p_abonne,
            fin_abo:        p_fin_abo,
            description:    p_description,
            adresse:        p_adresse,
            publique:       p_publique,
            photo_1:        p_photo_1,
            photo_2:        p_photo_2,
            photo_3:        p_photo_3,
            logo:           p_logo
        });
        return resultat.dataValues;
        }catch(error){
            throw error;
        }
}

export async function adminCreation(){
    try {
        await Utilisateur.create(
            {
                nom: 'Boutin',
                prenom: 'Nancy',
                role_id: 1,
                courriel: 'admin@admin',
                pwd: 'admin'
            }
        );
        console.log('Admin créé');
        
    } catch (error) {
        console.log(error);
        
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
    
    try{
        const user = await findOne({ courriel: p_courriel});
        
        if(!user)
            throw {message:"Utilisateur non trouvé"};

        const goodPassword = await bcrypt.compare(p_pwd, user.pwd);
        
        if(!goodPassword)
            throw {message:"Mot de passe invalide"};
        
        return user;

    }catch(error){
        throw error;
    }
}