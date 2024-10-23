<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import BoutonBleu from '$lib/components/boutons/boutonBleu.svelte';
    import Retour from "$lib/components/generaux/retour.svelte";
    import AbonnementEven from '$lib/components/boites/abonnementEven.svelte';
    import AbonnementExposant from '$lib/components/boites/abonnementExposant.svelte';
    import AvantagesExposant from "$lib/components/generaux/avantagesExposant.svelte";
    import AvantagesOrganisateur from "$lib/components/generaux/avantagesOrganisateur.svelte";

    export let data;
    const produit = data.produit;
    const abonne = data.abonne;
    const aboExposantOptions = data.aboExposant;
    const aboOrganisateurOptions = data.aboOrganisateur;

    const abonnement = produit.type.nom === 'Abonnement';
    const abonnementExposant = abonnement && produit.nom.includes("Abonnement exposant");
    const abonnementOrganisateur = abonnement && produit.nom.includes("Abonnement organisateur");

    const economie = (parseFloat(produit.prix_v) - parseFloat(produit.prix_a)).toFixed(2);
</script>

<div class="container is-fluid">

    <div class="columns">
        <div class="column is-one-third">
            <figure class="image is-1by1 ">
                <img src="{produit.photo}" alt="Photo {produit.nom}" />
            </figure>
        </div>

        <div class="column">
            <!-- Affichage du titre pour ne pas voir les différents abonnements (nombre catégories/événement) -->
            {#if abonnementExposant}
                <H2Title title={"Abonnement exposant"} />
            {:else if abonnementOrganisateur}
                <H2Title title={"Abonnement organisateur"} />
            {:else}
                <H1Title title={produit.nom} />
            {/if}

            <p>{produit.desc}</p><br><br>

            <!-- Si abonnement affiche une liste des avantages correspondant -->
            {#if abonnementExposant}
                <H2Title title={"Avantages :"} />
                <AvantagesExposant /><br><br>
            {/if}
            {#if abonnementOrganisateur}
                <H2Title title={"Avantages :"} />
                <AvantagesOrganisateur /><br><br>
            {/if}

            {#if !abonnement}
                Prix abonné: {produit.prix_a}<br>
                Prix non-abonné: {produit.prix_v}<br><br>
            {:else if produit.nom === 'Abonnement exposant 1 catégorie'}
            <div class="field-body">
                <div class="field">
                    <div class="controle">
                        <div class="select">
                            <select id="selectionAbonnement">
                                {#each aboExposantOptions as optionExposant}
                                    <option value={optionExposant.id}>{optionExposant.nom} {optionExposant.prix_v}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {:else if produit.nom === 'Abonnement organisateur 1 événement/an'}
            <div class="field-body">
                <div class="field">
                    <div class="controle">
                        <div class="select">
                            <select id="selectionAbonnement">
                                {#each aboOrganisateurOptions as optionOrganisateur}
                                    <option value={optionOrganisateur.id}>{optionOrganisateur.nom} {optionOrganisateur.prix_v}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {/if}
            <BoutonBleu lien={'/panier'} texte={'Acheter'} /> <!-- fonction={ajouterPanier} -->
            <Retour />
        </div>
    </div>


    {#if produit.prix_v !== produit.prix_a} <!-- S'assurer qu'il y a une différence entre les prix -->
    <div class="block">
        {#if abonne !== true}
            <H2Title title={"Abonnements"} />
            En étant membre, tu économiserais <b>{economie} $</b> en plus de profiter de plusieurs avantages exclusifs!<br><br>
            <div class="container-fluid">
                <div class="columns mx-4 is-centered">
            
                    <div class="column is-two-fifths">
                        <AbonnementExposant />
                    </div>
            
                    <div class="column is-two-fifths">
                        <AbonnementEven />
                    </div>
                </div>
            </div>
        {:else}
            En étant membre, tu économises <b>{economie} $</b> en plus de profiter de plusieurs avantages exclusifs!<br>
        {/if}
    </div>
    {:else} <!-- Si PAS de différence entre les prix, mais non-abonné -->
        {#if abonne !== true}
            <div class="block">
                <H2Title title={"Abonnements"} />
                <div class="container-fluid">
                    <div class="columns mx-4 is-centered">
                
                        <div class="column is-two-fifths">
                            <AbonnementExposant />
                        </div>
                
                        <div class="column is-two-fifths">
                            <AbonnementEven />
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    {/if}

</div>