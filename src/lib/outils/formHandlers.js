import { writable } from 'svelte/store';

export const erreur = writable(null);
erreur.set('');
export async function nouveauCompte(event) {
    const formData = new FormData(event.target);
    

        const response = await fetch('./api?/new', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        console.log(result);
        
        if (result.type === 'success') {
            alert('Nouvel utilisateur enregistré');
        } else {
            alert('Erreur : ' + JSON.parse(result.data)[0]);
        }
}

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
        console.log(result);
        
    } else {
        alert('Erreur : ' + JSON.parse(result.data)[0]);
    }
}

export async function connexion(event){
    
    const formData = new FormData(event.target);
    const response = await fetch('./api?/connexionUtilisateur', {
        method: 'POST',
        body: formData
    });
    
    const result = await response.json();
    
    if (result.type === 'success') {
        alert('Utilisateur connecté');
        console.log(result);
        
    } else {
        alert('Erreur : ');
    }
}

export async function creationExposant(event){
    const formData = new FormData(event.target);
    // Vérifier si le nombre de checkbox cochées est entre 1 et 3 pour Domaine(s) d'activit(é)s
    // const checkboxes = event.target.querySelectorAll('input[type="checkbox"]:checked:not(.exclus)');
    // if (checkboxes.length < 1 || checkboxes.length > 3) {
    //   erreur.set('Merci de sélectionner entre 1 et 3 domaine(s) d\'activité(s) selon l\'abonnement choisi.');
    //   return;
    // }

    // Choix obligatoire pour NEQ, l'utilisateur inscrit son NEQ ou coche la checkbox
    const neqInput = event.target.querySelector('#neq');
    const noNeqCheckbox = event.target.querySelector('#no-neq');

    if (!neqInput.value && !noNeqCheckbox.checked) {
      erreur.set('Merci de remplir le champ NEQ ou cocher la case "Je n\'ai pas de NEQ".');
      return;
    }
    

    const response = await fetch('../api?/nouveauExposant', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      if (result.type == 'failure')
        erreur.set(JSON.parse(result.data)[0]);
      else
      console.log('fin du log');
      
        // window.location.href = '/'; //AJOUTER LIEN
}