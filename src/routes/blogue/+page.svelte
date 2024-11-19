<script>
	import H1Title from '$lib/components/titres/h1Title.svelte';
	import Recherche from '$lib/components/generaux/recherche.svelte';
	import RechercheNoResult from '$lib/components/generaux/rechercheNoResult.svelte';
	import { log } from '../../lib/outils/debug.js';

	export let data;
	let { blogues } = data;
	let searchQuery = '';
</script>

<H1Title title={'Tous les billets de blogue en ligne'} />
<h2 class="subtitle has-text-centered is-6 block">
	Retrouvez tous les conseils pratiques, astuces et collaborations pour réussir vos marchés
	d'artisans et événements partout au Québec, au même endroit.
</h2>
<div class="block mx-5">
	<Recherche bind:searchQuery typeRecherche={'un article de blogue'} />
	{#if blogues.filter((x) => {
		const recherche = searchQuery.toLowerCase();
		return x.titre.toLowerCase().includes(recherche);
	}).length === 0}
		<RechercheNoResult />
	{:else}
		<div class="fixed-grid has-4-cols has-1-cols-mobile">
			<div class="grid block is-col-min-14">
				{#each blogues.filter(x => {
					const recherche = searchQuery.toLowerCase();
					return x.titre.toLowerCase().includes(recherche);
				  }) as blogue}
					<div class="cell">
						<div
							class="card"
							style="background-image: url(/{blogue.image_1}); background-size: cover; background-position: center;"
						>
							<div class="card-header"></div>
							<div class="blog-element mt-5">
								<p class="subtitle m-2">
									{blogue.titre}
								</p>
							</div>
							<div class="blog-element">
								<p class="m-2 help">
									{blogue.article.slice(0, 100)}...
								</p>
							</div>
							<footer class="card-footer blog-element is-flex is-justify-content-space-between">
								<p class="m-2">
									{blogue.createdAt.toLocaleDateString('fr-CA')}
								</p>
								<p class="m-2 has-text-right">
									<a href="blogue/{blogue.id}">Lire la suite...</a>
								</p>
							</footer>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
