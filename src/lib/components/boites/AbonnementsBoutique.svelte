<script>
    import H2Title from '../titres/h2Title.svelte';
    export let lienExposant;
    export let lienOrganisateur;
</script>

<div class="grid is-col-min-10">
    <!-- Pour acheter un abonnement exposant -->
    <div class="cell">
        <div class="card">
            <div class="card-content">
                <div class="content">
                    <H2Title title={"Exposants"} />
                    <ul>
						<li>Fiche de ton entreprise dans le répertoire pour le public</li>
						<li>Reçois les appels de candidatures par courriel</li>
						<li>Accès au groupe Facebook</li>
						<li>Accès aux rabais de nos partenaires</li>
						<li>Accès aux ressources dans l’espace membre</li>
					</ul>

                    <div class="content has-text-centered">
                        <a href={lienExposant}><button class="px-3 py-3">Plus de détails</button></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Pour acheter un abonnement organisateur/événement -->
    <div class="cell">
        <div class="card">
            <div class="card-content">
                <div class="content">
                    <H2Title title={"Événements"} />
                    <ul>
						<li>Inscription au répertoire des événements pour le public</li>
						<li>Fiche détaillée de l’événement avec photos</li>
						<li>Affichage prioritaire sur la page d’accueil des visiteurs</li>
						<li>Accès aux rabais de nos partenaires</li>
						<li>Accès aux ressources dans l’espace membre</li>
					</ul>

                    <div class="content has-text-centered">
                        <a href={lienOrganisateur}><button class="px-3 py-3">Plus de détails</button></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    button {
		background-color: #d9d9d9;
		border-radius: 5px;
		color: black;
	}
</style>