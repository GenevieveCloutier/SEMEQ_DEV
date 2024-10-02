<script>
	import BoutonGris from '../boutons/boutonGris.svelte';
	import H2Title from '../titres/h2Title.svelte';
</script>

<div class="columns is-centered mt-4">
	<div class="column is-one-third-desktop">
		<!-- pour acheter un abonnement événement -->
		<div class="container px-4 py-4 has-text-centered">
			<H2Title title={"Obtiens plus d'avantages avec un abonnement!"} />
			<div class="container-content">
				<div class="content has-text-left">
					<ul>
						<li>Inscription au répertoire des événements pour le public</li>
						<li>Fiche détaillée de l’événement avec photos</li>
						<li>Affichage prioritaire sur la page d’accueil des visiteurs</li>
						<li>Accès aux rabais de nos partenaires</li>
						<li>Accès aux ressources dans l’espace membre</li>
					</ul>
				</div>
				<BoutonGris lien={'/#'} texte={'Voir les détails'} />
				<br />
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		border: 1px solid #d9d9d9;
		border-radius: 10px;
	}
</style>
