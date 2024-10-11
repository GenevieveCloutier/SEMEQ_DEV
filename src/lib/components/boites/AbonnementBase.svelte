<script>
	import BoutonGris from '../boutons/boutonGris.svelte';
	import H2Title from '../titres/h2Title.svelte';
</script>



		<!-- pour acheter un abonnement exposant -->
		<div class="container px-4 py-4 has-text-centered">
            <div class="zone">
			    <H2Title title={"Compte gratuit"} />
				<p class="is-size-6 has-text-grey mb-3">Un compte gratuit te permet de:</p>
            </div>
			<div class="container-content">
				<div class=" zone content has-text-left">
					<ul>
						<li>Ajouter un événement gratuit au répertoire</li>
						<li>Modifier tes événements</li>
                        <li>Acheter des formations et des outils</li>
						<li>Accéder à tes formations et outils</li>
						
					</ul>
                    <div class="zone has-text-centered">
                        <BoutonGris lien={'/creation_compte/compte_gratuit'} texte={'Voir les détails'} />
                    </div>
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
