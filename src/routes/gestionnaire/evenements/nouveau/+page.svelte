<script>
    import H1Title from '$lib/components/titres/h1Title.svelte';
    import H3Title from '$lib/components/titres/h3Title.svelte';
	import Retour from '$lib/components/generaux/retour.svelte';
	import CheckboxResponsabilite from '$lib/components/formulaires/checkboxResponsabilite.svelte';
	import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
	import BoutonBleu from '$lib/components/boutons/boutonBleu.svelte';
    import {creationEvenementPayant, erreur} from '$lib/outils/formHandlers';
	import NotifDanger from '$lib/components/notifications/notifDanger.svelte';
    import NotifSuccess from '$lib/components/notifications/notifSuccess.svelte';
	import { onMount } from 'svelte';
    import FormEvenAbonne from '$lib/components/formulaires/formEvenAbonne.svelte'

    export let data;
    const { villes } = data;

    onMount(()=>{
        const actives = document.querySelectorAll('a.is-active');
        actives.forEach((x)=>x.classList.remove('is-active'));
        document.getElementById('evenementsnouveau').classList.add('is-active')

        const requis = document.querySelectorAll('[required]');
        requis.forEach(x => {
            x.removeAttribute('required');
        });
    });

</script>

<div class="block">
    <H1Title title={"Inscrire un événement"} />
    <FormEvenAbonne villes={villes}/>
  </div>
