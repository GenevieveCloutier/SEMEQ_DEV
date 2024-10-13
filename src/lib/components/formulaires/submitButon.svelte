<script>
	import { erreur } from "../../outils/formHandlers";

	export let texte;
	export let fonction = () => {}; //Vraiment besoin ? ou on supprime ?



	//Permet de retirer la classe de chargement si un message d'erreur s'affiche
	$: if ($erreur !== '') {
		document.getElementById('submitButton').classList.remove('is-loading');
    }
</script>

<button id="submitButton" type="submit" class="button is-dark" style="background-color: #053682; color:white">{texte}</button>