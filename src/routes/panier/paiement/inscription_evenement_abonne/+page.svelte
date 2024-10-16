<script>
	import H1Title from '$lib/components/titres/h1Title.svelte';
	import NotifDanger from '$lib/components/notifications/notifDanger.svelte';
	import Etape2Organisateur from '$lib/components/barre_progression_paiement/etape2Organisateur.svelte';
    import {creationEvenementPayant, erreur} from '$lib/outils/formHandlers';
    import FormEvenAbonne from '$lib/components/formulaires/FormEvenAbonne.svelte';

    export let data;
	const {villes} = data;



</script>

<div class="block">
    <div class="mt-5 container has-text-centered">
        <!-- modifier le lien pour envoyer vers son compte -->
        <a href="/repertoire_evenements" class="py-3 px-3 button has-background-grey-lighter">Je souhaite inscrire mon événement plus tard</a>
        <p class="mt-5 mb-5">Tu pourras modifier ton événement et en ajouter d'autres en tout temps depuis ton compte</p>
    </div>

    <Etape2Organisateur />
    <H1Title title={"Inscrire mon événement"} />
    <FormEvenAbonne villes={villes} />
</div>


