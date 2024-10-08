import { Op } from "sequelize";
import { Evenement } from "../models/Evenement.model";
import { Utilisateur } from "../models/Utilisateur.model";
import { Ville } from "../models/Ville.model";
 
/**
 * 
 *
 * @export
 * @async
 * @returns {Object}
 */
export async function findAll(){
    return await Evenement.findAll({
        include: [
            { model: Utilisateur, as: "utilisateur" },
            { model: Ville, as: "ville" }
        ],
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Aucun evenement à afficher")
        }
        return resultat.map(evenement => ({
            ...evenement.dataValues,
            utilisateur: evenement.utilisateur ? evenement.utilisateur.dataValues : null,
            ville: evenement.ville ? evenement.ville.dataValues : null
        }));
    })
    .catch((error)=>{
        throw error;
    });
}; 

export async function creationEvenement(p_nom,p_utilisateur_id,p_contact,p_entreprise,p_debut_even,
                                        p_fin_even,p_horaire_even,p_debut_cand,p_fin_cand,
                                        p_fondation,p_nb_visiteur,p_nb_expo,p_profil,p_site,
                                        p_fb_even,p_courriel,p_ville_id,p_adresse,p_emplacement,
                                        p_type,p_type_autre,p_form_cand,p_verification,p_verification_autre,
                                        p_selection,p_limite,p_description,p_photo_1,p_photo_2,p_photo_3,p_approuve){

    try {    
            console.log('nom = ',p_nom);
            console.log('ville = ',p_ville_id);
            console.log('debut = ',p_debut_even);
            console.log('fin = ',p_fin_even);
            
            
            
            
        const doublon = await Evenement.findAll({
            where:{
                nom: p_nom,
                ville_id: p_ville_id,
                [Op.or]:[
                    {debut_even: new Date(p_debut_even).toISOString()},
                    {fin_even:new Date(p_fin_even).toISOString()}
                ]
            }
        });
        console.log('doublon = ', doublon);
        if (doublon.length > 0) {
            throw "Un événement similaire existe déjà";
        }
    
        const resultat = await Evenement.create(
            {
                nom :                p_nom,
                utilisateur_id :     p_utilisateur_id,
                entreprise  :        p_entreprise ,
                contact :            p_contact,
                debut_even :         p_debut_even,
                fin_even  :          p_fin_even ,
                horaire_even :       p_horaire_even,
                debut_cand :         p_debut_cand,
                fin_cand  :          p_fin_cand ,
                fondation :          p_fondation,
                nb_visiteur :        p_nb_visiteur,
                nb_expo :            p_nb_expo,
                profil :             p_profil,
                site :               p_site,
                fb_even :            p_fb_even,
                courriel :           p_courriel,
                ville_id :           p_ville_id,
                adresse :            p_adresse,
                emplacement :        p_emplacement,
                type :               p_type,
                type_autre  :        p_type_autre ,
                form_cand :          p_form_cand,
                verification_autre : p_verification_autre ,
                verification :       p_verification,
                selection :          p_selection,
                limite :             p_limite,
                description :        p_description,
                photo_1 :            p_photo_1,
                photo_2 :            p_photo_2,
                photo_3 :            p_photo_3,
                approuve :            p_approuve
            }
        );
        return resultat.dataValues;
    } catch (error) {
        throw (error);
        
    }
}