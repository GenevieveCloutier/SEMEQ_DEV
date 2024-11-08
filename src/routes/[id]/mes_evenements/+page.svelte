<script>
	import H1Title from '$lib/components/titres/h1Title.svelte';
	import SectionEvenement from '../../../lib/components/boites/sectionEvenement.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		const actives = document.querySelectorAll('a.is-active');
		actives.forEach((x) => x.classList.remove('is-active'));
		document.getElementById('mesEvenements').classList.add('is-active');
	});

	export let data;
	const { evenements, utilisateur } = data;

	let lien = utilisateur.abonne
		? './mes_evenements/inscription_evenement_abonne'
		: '/repertoire_evenements/inscription_evenement_gratuit';
</script>

<H1Title title={'Mes événements'} />

<div class="container is-fluid">
	<div
		class="fixed-grid is-col-min-10 has-2-cols-mobile has-3-cols-tablet has-4-cols-desktop has-4-cols-widescreen has-5-cols-fullhd"
	>
		<div class="grid">
			{#each evenements as evenement}
				<SectionEvenement
					id={evenement.id}
					photo={evenement.photo_1}
					nom={evenement.nom}
					debut_even={evenement.debut_even.toLocaleDateString('fr-CA')}
					fin_even={evenement.fin_even.toLocaleDateString('fr-CA')}
				/>
			{/each}
		</div>
	</div>
	<div class="block has-text-right">
		<a href={lien} class="button is-primary-blue">Ajouter un événement</a>
	</div>
</div>
