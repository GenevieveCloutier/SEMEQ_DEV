<script>
	import { erreur, success } from "../../outils/formHandlers";

	export let texte;
	export let fonction = () => {}; //Vraiment besoin ? ou on supprime ? Gen: Oui, je l'utilise!


	//Permet de retirer la classe de chargement si un message d'erreur ou de succes s'affiche
	//Le setTimeout a été ajouté car dans certain cas le classList remove se lançait avant que le bouton ne soit chargé
	//ce qui causais des erreur d'affichage
	$: if ($erreur !== '' || $success !== '') {
		setTimeout(() => {
			document.getElementById('submitButton').classList.remove('is-loading');
		}, 1000);
    }
</script>

<button id="submitButton" type="submit" class="button is-dark" style="background-color: #053682; color:white" 
	on:click={fonction}>{texte}
</button>