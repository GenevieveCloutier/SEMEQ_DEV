<script>
	import BoutonGris from '../boutons/boutonGris.svelte';
	import H2Title from '../titres/h2Title.svelte';
</script>



		<!-- pour acheter un abonnement exposant -->
		<div class="container px-4 py-4 has-text-centered">
            <div class="zone">
			    <H2Title title={"Obtiens plus d'avantages avec un abonnement Exposant!"} />
            </div>
			<div class="container-content">
				<div class=" zone content has-text-left">
					<ul>
						<li>Fiche de ton entreprise dans le répertoire pour le public</li>
						<li>Reçois les appels de candidatures par courriel</li>
						<li>Accès au groupe Facebook</li>
						<li>Accès aux rabais de nos partenaires</li>
						<li>Accès aux ressources dans l’espace membre</li>
					</ul>
                    <div class="zone has-text-centered">
                        <BoutonGris lien={'/exposant#infoExposant'} texte={'Voir les détails'} />
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
