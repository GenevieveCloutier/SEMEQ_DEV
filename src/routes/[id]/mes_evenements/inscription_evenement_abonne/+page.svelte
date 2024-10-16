<script>
	import H1Title from '$lib/components/titres/h1Title.svelte';
	import NotifDanger from '$lib/components/notifications/notifDanger.svelte';
  import {creationEvenementPayant, erreur} from '$lib/outils/formHandlers';
  import FormEvenAbonne from '$lib/components/formulaires/FormEvenAbonne.svelte';

  export let data;
	const {villes} = data;

	/**
	 * Gère la soumission du formulaire pour créer un nouvel élément.
	 * @param {Event} event - L'événement de soumission du formulaire.
	 * @returns {void}
	 */
	async function handleSubmit(event) {
		const formData = new FormData(event.target);

		const response = await fetch('?/newExposant', {
			method: 'POST',
			body: formData
		});
		const result = await response.json();
		if (result.type == 'failure') erreur = JSON.parse(result.data)[0];
		else window.location.href = '/'; //AJOUTER LIEN
	}

</script>

<div class="block">
  <H1Title title={"Inscrire mon événement"} />
  <FormEvenAbonne villes={villes}/>
</div>


