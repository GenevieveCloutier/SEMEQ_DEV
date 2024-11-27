<script>
	import { recuperation, erreur } from '$lib/outils/formHandlers';
	import H1Title from '$lib/components/titres/h1Title.svelte';
	import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
	import Retour from '$lib/components/generaux/retour.svelte';
	import { onMount } from 'svelte';

</script>

<H1Title title={'Demande de récupération de mot de passe'}></H1Title>
<p class="is-size-6 has-text-centered mb-3">
	Vous recevrez un lien de réinitialisation de mot de passe
</p>
<div class="columns is-centered">
	<div class="column is-4">
		{#if $erreur}
			<div class="notification is-danger has-text-centered">
				<p>{$erreur}</p>
			</div>
		{/if}
		<div class="box is-3">
			<form on:submit|preventDefault={recuperation}>
				<div class="field">
					<label class="label" for="courriel">Courriel</label>
					<div class="control">
						<input class="input" type="mail" name="courriel" id="courriel" placeholder="" />
					</div>
				</div>
				<a href="#" class="help has-text-centered">J'ai oublié mon courriel</a>
				<div class="block has-text-centered">
					<div class="skeleton-block"></div>
					<!-- Valider si SubmitButon fait la bonne action! -->
					<SubmitButon texte={'Envoyer'}></SubmitButon>
					<Retour />
				</div>
			</form>
		</div>
	</div>
</div>
