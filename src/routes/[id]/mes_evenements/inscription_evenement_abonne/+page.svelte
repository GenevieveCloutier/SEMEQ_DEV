<script>
	import H1Title from '$lib/components/titres/h1Title.svelte';
	import NotifDanger from '$lib/components/notifications/notifDanger.svelte';
  import {creationEvenementPayant, erreur} from '$lib/outils/formHandlers';
  import FormEvenAbonne from '$lib/components/formulaires/FormEvenAbonne.svelte';

  export let data;
	const {villes} = data;

</script>

<div class="block">
  <H1Title title={"Inscrire mon événement"} />
  <FormEvenAbonne villes={villes}/>
</div>



