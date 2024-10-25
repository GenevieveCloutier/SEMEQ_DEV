<script>
    import H3Title from '../titres/h3Title.svelte';
    import AvantagesExposant from '../generaux/avantagesExposant.svelte';
    import AvantagesOrganisateur from '../generaux/avantagesOrganisateur.svelte';
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
                    <AvantagesExposant />
                    <div class="content has-text-centered">
                        <a href={`./boutique/abonnement_exposant`}><button class="px-3 py-3">Plus de détails</button></a>
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
                    <AvantagesOrganisateur />
                    <div class="content has-text-centered">
                        <a href={`./boutique/abonnement_organisateur`}><button class="px-3 py-3">Plus de détails</button></a>
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