<script>
	import BoutonGris from '../boutons/boutonGris.svelte';
	import H2Title from '../titres/h2Title.svelte';
	import AvantagesOrganisateur from '../generaux/avantagesOrganisateur.svelte';
</script>



		<!-- pour acheter un abonnement événement -->
		<div class="container px-4 py-4 has-text-centered">
			<div class="zone">
				<H2Title title={"Obtiens plus d'avantages avec un abonnement Événement!"} />
				<p class="is-size-6 has-text-grey mb-3">Tout ce que le compte gratuit offre +</p>
			</div>
			<div class="container-content">
				<AvantagesOrganisateur />
				<div class="zone has-text-centered">
					<!-- ajuster le lien pour que ça rende à la section de tableau de la page quand elle sera faite -->
					<BoutonGris lien={'/organisateur#avantages'} texte={'Voir les détails'} />
				</div>
			</div>
		</div>



<style>
	.container {
		border: 1px solid #d9d9d9;
		border-radius: 10px;
		display: flex;
        flex-direction: column;
		height: 100%;
	}

	.zone{
		display: flex;
        flex-direction: column;
        height: 100%;
	}
</style>
