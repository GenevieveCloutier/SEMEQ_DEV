import { writable } from 'svelte/store';
import { log } from './debug';

export const erreur = writable(null);
erreur.set('');

export async function handleUserDelete(event)
{
    //mettre un premier niveau de securite ici pour verifier les droits
    
    const formData = new FormData(event.target);
    
        const response = await fetch('./api?/supprimeUtilisateur', {
            method: 'POST',
            body: formData
        });
    
    const result = await response.json();

    if (result.type === 'success') {
        alert('Utilisateur supprimé');
        log(result);
        
    } else {
        alert('Erreur : ' + JSON.parse(result.data)[0]);
    }
}

/**
 * Gère la connexion d'un utilisateur à partir des données du formulaire.
 *
 * Cette fonction récupère les données du formulaire soumis, envoie une requête
 * POST à l'API pour établir la connexion, puis redirige vers la page d'accueil
 * si la connexion réussit. En cas d'échec, un message d'erreur est affiché.
 *
 * @param {Event} event - L'événement déclenché par la soumission du formulaire.
 *
 * @throws {Error} - Lance une erreur en cas de problème lors de la requête.
 */
export async function connexion(event){
    erreur.set('');
    const formData = new FormData(event.target);
    const response = await fetch('./api?/connexionUtilisateur', {
        method: 'POST',
        body: formData
    });
    
    const result = await response.json();
    
    if (result.type === 'success') {
        window.location.href = '/';
    } else if (result.type === 'failure'){
        erreur.set(JSON.parse(result.data)[1]);
    }
}

/**
 * Gère la création d'un nouvel exposant en envoyant les données du formulaire via une requête POST.
 * Vérifie que le nombre de cases à cocher sélectionnées pour le domaine d'activité est compris entre 1 et 3.
 * Vérifie que l'utilisateur a rempli le champ NEQ ou coché la case correspondante.
 * En cas de succès (status 200), redirige vers la page d'accueil.
 * En cas d'échec (status 401), définit un message d'erreur.
 * Enregistre toute erreur inattendue dans la console.
 * 
 * @param {Event} event L'événement contenant les données du formulaire.
 */

export async function creationExposant(event){
    erreur.set('');
    try{
    const formData = new FormData(event.target);
    
    // Vérifier si le nombre de checkbox cochées est entre 1 et 3 pour Domaine(s) d'activit(é)s
    const checkboxes = event.target.querySelectorAll('input[type="checkbox"]:checked:not(.exclus)');
    if (checkboxes.length < 1 || checkboxes.length > 3) {
      erreur.set('Merci de sélectionner entre 1 et 3 domaine(s) d\'activité(s) selon l\'abonnement choisi.');
      return;
    }

    // Choix obligatoire pour NEQ, l'utilisateur inscrit son NEQ ou coche la checkbox
    const neqInput = event.target.querySelector('#neq');
    const noNeqCheckbox = event.target.querySelector('#no-neq');

    if (!neqInput.value && !noNeqCheckbox.checked) {
      erreur.set('Merci de remplir le champ NEQ ou cocher la case "Je n\'ai pas de NEQ".');
      return;
    }
    const response = await fetch('../api?/nouvelUtilisateur', {
        method: 'POST',
        body: formData
      });
      
    const result = await response.json();
    if (result.status == 200)
        window.location.href = '/';
    if (result.status == 401)
        erreur.set(JSON.parse(result.data)[0]);
    }catch(error){
        console.error("erreur inattendue : ", error);
        erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.")
    }
}

export async function creationOrganisateur(event){
    erreur.set('');
    const formData = new FormData(event.target);

    // Choix obligatoire pour NEQ, l'utilisateur inscrit son NEQ ou coche la checkbox
    const neqInput = event.target.querySelector('#neq');
    const noNeqCheckbox = event.target.querySelector('#no-neq');

    if (!neqInput.value && !noNeqCheckbox.checked) {
      erreur.set('Merci de remplir le champ NEQ ou cocher la case "Je n\'ai pas de NEQ".');
      return;
    }
    

    const response = await fetch('../api?/nouvelUtilisateur', {
        //le form s'envoie, ça va dans la BD mais message 'Organisateur créé, mais aucune idee d\'ou c\'est partie' apparait
        //est-ce qu'on peut donc enlever le alert?
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      if (result.type == 'failure'){
        erreur.set(JSON.parse(result.data)[0]);
        return
      }
       
      else
        alert('Organisateur créé, mais aucune idee d\'ou c\'est partie');
        window.location.href = '/panier/paiement/inscription_evenement_abonne'; //lien vers où ça doit aller après avoir envoyé le form
}

/**
 * Gère la création d'un nouvel événement en envoyant les données du formulaire via une requête POST.
 * En cas de succès (status 200), redirige vers la page d'accueil.
 * En cas d'échec (status 401), définit un message d'erreur.
 * Enregistre toute erreur inattendue dans la console.
 * 
 * @param {Event} event L'événement contenant les données du formulaire.
 */
export async function creationEvenement(event) {
    erreur.set('');
    try{
        const formData = new FormData(event.target);
        const response = await fetch('../api?/nouvelEvenement', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (result.status == 200)
            window.location.href = '/';//redirection a discuter avec le groupe
        if (result.status == 401)
            erreur.set(JSON.parse(result.data)[0]);
    }catch(error){
            console.error("erreur inattendue : ", error);
            erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.")
    }
}

//ici
/**
 * Gère la création d'un nouvel événement payant en envoyant les données du formulaire via une requête POST.
 * En cas de succès (status 200), redirige vers la page d'accueil.
 * En cas d'échec (status 401), définit un message d'erreur.
 * Enregistre toute erreur inattendue dans la console.
 * 
 * @param {Event} event L'événement contenant les données du formulaire.
 */
export async function creationEvenementPayant(event) {
    erreur.set('');
    try{
        const formData = new FormData(event.target);
        const response = await fetch('../../api?/nouvelEvenement', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (result.status == 200)
            window.location.href = '/';//redirection a discuter avec le groupe
        if (result.status == 401)
            erreur.set(JSON.parse(result.data)[0]);
            return
    }catch(error){
            console.error("erreur inattendue : ", error);
            erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.")
    }
}
//ici

/**
 * Gère la création d'un nouveau visiteur en envoyant les données du formulaire via une requête POST.
 * En cas de succès (status 200), redirige vers la page d'accueil.
 * En cas d'échec (status 401), définit un message d'erreur.
 * Enregistre toute erreur inattendue dans la console.
 * 
 * @param {Event} event L'événement contenant les données du formulaire.
 */

export async function creationVisiteur(event){
    erreur.set('');
    try{
        const formData = new FormData(event.target);
        const response = await fetch('../api?/nouvelUtilisateur', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (result.status == 200)
            window.location.href = '/';
        if (result.status == 401)
            erreur.set(JSON.parse(result.data)[0]);
    }catch(error){
        console.error("erreur inattendue : ", error);
        erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
    }
}


export async function recuperation(event){
    erreur.set('');
    try{
        const formData = new FormData(event.target);
        const response = await fetch('../api?/recuperation', {
            method: 'POST',
            body: formData
        });
        log("formhandler response = ", response);
        const result = await response.json();
        log("formhandler recuperation, result = ",result);
        
        if (result.status == 200)
            window.location.href = '/connexion/demandeEnvoye';
        if (result.status == 401)
            erreur.set(JSON.parse(result.data)[0]);
        
    }catch(error){
        console.error("erreur inattendue : ", error);
        erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
    }
}

export async function changementMotDePasse(event){
    erreur.set('');
    try{
        const formData = new FormData(event.target);
       log("formhandler changementMotDePasse formdata = ", formData);
        const response = await fetch('../../api?/changement', {
            method: 'POST',
            body: formData
        });
        log("formhandler changementMDP response = ", response);
        const result = await response.json();
        log("formhandler changementMDP result = ", result);
        if (result.status == 200)
            window.location.href = '/connexion';
        if (result.status == 401)
            erreur.set(JSON.parse(result.data)[0]);
        
    }catch(error){
        console.error("erreur inattendue : ", error);
        erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
    }
}




//ici
// export async function nouveauCompteEven(event){
    
//     const formData = new FormData(event.target);
//     const response = await fetch('./api?/nouveauCompteEven', {
//         method: 'POST',
//         body: formData
//     });
    
//     const result = await response.json();
    
//     if (result.type === 'success') {
//         window.location.href = '/repertoire_evenements/inscription_evenement_gratuit';
//     } else if (result.type === 'failure'){
//         erreur.set(JSON.parse(result.data)[1]);
//     }
    //rediriger vers la page d'inscription d'événement gratuit
// }
//ici