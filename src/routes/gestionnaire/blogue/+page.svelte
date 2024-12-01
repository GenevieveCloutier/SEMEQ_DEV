<script>
	import H1Title from '$lib/components/titres/h1Title.svelte';
	import { onMount } from 'svelte';
	import Recherche from '../../../lib/components/generaux/recherche.svelte';
	import RechercheNoResult from '../../../lib/components/generaux/rechercheNoResult.svelte';
	import NotifDanger from '../../../lib/components/notifications/notifDanger.svelte';
	import NotifSuccess from '../../../lib/components/notifications/notifSuccess.svelte';
	

	export let data;
	let { blogues } = data;
	let searchQuery = '';
	let orientation = 1; //Variable pour gérer le sens de triage

	onMount(()=>{
        const actives = document.querySelectorAll('a.is-active');
        actives.forEach((x)=>x.classList.remove('is-active'));
    document.getElementById('blogue').classList.add('is-active')
    });

	function triage(event, champ) {
		if (champ == 'createdAt')
			blogues.sort((a, b) => {
				return a[champ] < b[champ] ? -1 * orientation : a[champ] > b[champ] ? +1 * orientation : 0;
			});
		else
			blogues.sort((a, b) => {
				return a[champ]?.toUpperCase() < b[champ]?.toUpperCase()
					? -1 * orientation
					: a[champ]?.toUpperCase() > b[champ]?.toUpperCase()
						? +1 * orientation
						: 0;
			});
		blogues = blogues; //Pour bind le tableau
		orientation *= -1;
		if (orientation == 1)
			//pour changer l'icon
			event.target.classList.replace('fa-arrow-down-short-wide', 'fa-arrow-up-short-wide');
		else event.target.classList.replace('fa-arrow-up-short-wide', 'fa-arrow-down-short-wide');
	}
</script>

<H1Title title={'Tous les billets de blog'} />
<NotifDanger />
<NotifSuccess />

<div class="section">
	<div class="columns is-align-content-center">
		<div class="column">
			<Recherche bind:searchQuery typeRecherche="un article" />
		</div>
		<div class="column is-narrow">
			<div class="control block">
				<a href="/gestionnaire/blogue/nouveau" class="button is-primary-blue">Ajouter un article</a>
			</div>
		</div>
	</div>
	{#if blogues.filter((x) => {
		const recherche = searchQuery.toLowerCase();
		return x.titre.toLowerCase().includes(recherche);
	}).length === 0}
		<RechercheNoResult />
	{:else}
		<div class="block table-container">
			<table class="table is-hoverable is-striped is-fullwidth">
				<thead class="has-text-centered">
					<tr>
						<th
							>Titre de l'article <button on:click={(event) => triage(event, 'titre')}
								><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button
							></th
						>
						<th
							>Date de publication <button on:click={(event) => triage(event, 'createdAt')}
								><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button
							></th
						>
						<th
							>Incipit <button on:click={(event) => triage(event, 'article')}
								><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button
							></th
						>
					</tr>
				</thead>
				<tbody>
					{#each blogues.filter((x) => {
						const recherche = searchQuery.toLowerCase();
						return x.titre.toLowerCase().includes(recherche);
					}) as blogue}
						<tr on:click={() => (window.location = `./blogue/${blogue.id}`)}>
							<td>{blogue.titre}</td>
							<td>{blogue.createdAt.toLocaleDateString('fr-CA')}</td>
							<td>{blogue.article.slice(0, 100)}...</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
