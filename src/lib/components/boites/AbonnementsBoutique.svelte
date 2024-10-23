<script>
    import H3Title from '../titres/h3Title.svelte';
    export let lienExposant;
    export let lienOrganisateur;
</script>
    
<div class="columns mx-4">
    <div class="column is-two-fifths">
        <!-- Pour acheter un abonnement exposant -->
        <div class="cell">
            <div class="card">
                <div class="card-content">
                    <div class="content has-text-centered">
                        <H3Title title={"Exposants"} />
                    </div>
                    <div class="content">
                        <ul>
                            <li>Fiche de ton entreprise dans le répertoire pour le public</li>
                            <li>Reçois les appels de candidatures par courriel</li>
                            <li>Accès au groupe Facebook</li>
                            <li>Accès aux rabais de nos partenaires</li>
                            <li>Accès aux ressources dans l’espace membre</li>
                        </ul>
                    </div>
                    <div class="content has-text-centered">
                        <a href={lienExposant}><button class="px-3 py-3">Plus de détails</button></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="column is-two-fifths">
        <!-- Pour acheter un abonnement organisateur/événement -->
        <div class="cell">
            <div class="card">
                <div class="card-content">
                    <div class="content has-text-centered">
                        <H3Title title={"Événements"} />
                    </div>
                    <div class="content">
                        <ul>
                            <li>Fiche de ton entreprise dans le répertoire pour le public</li>
                            <li>Reçois les appels de candidatures par courriel</li>
                            <li>Accès au groupe Facebook</li>
                            <li>Accès aux rabais de nos partenaires</li>
                            <li>Accès aux ressources dans l’espace membre</li>
                        </ul>
                    </div>
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