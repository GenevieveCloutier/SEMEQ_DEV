<script>
	import { erreur } from "../../outils/formHandlers";

	export let texte;
	export let fonction = () => {}; //Vraiment besoin ? ou on supprime ?

	/**
 	* Ajoute la classe 'is-loading' à l'élément déclencheur de l'événement.
 	*
 	* Cette fonction permet d'ajouter une classe CSS au bouton de validation
 	* afin de signaler visuellement que le chargement est en cours.
 	*
 	* @param {Event} event - L'événement déclenché, contenant l'élément cible.
 	*/
	function chargement(event){
		event.target.classList.add('is-loading');
	}

	//Permet de retirer la classe de chargement si un message d'erreur s'affiche
	$: if ($erreur) {
		document.getElementById('submitButton').classList.remove('is-loading');
    }
</script>

<button id="submitButton" type="submit" class="button" style="background-color: #053682; color:white" on:click={chargement}>{texte}</button>