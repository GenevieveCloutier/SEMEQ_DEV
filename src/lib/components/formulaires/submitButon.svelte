<script>
	import { erreur } from "../../outils/formHandlers";

	export let texte;
	export let fonction = () => {};

	function chargement(event){
		event.target.classList.add('is-loading');
	}

	$: if ($erreur) {
		document.getElementById('submitButton').classList.remove('is-loading');
    }
</script>

<button id="submitButton" type="submit" class="button" style="background-color: #053682; color:white" on:click={chargement}>{texte}</button>