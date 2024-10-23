<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import BoutonGris from '$lib/components/boutons/boutonGris.svelte';
    import Retour from "$lib/components/generaux/retour.svelte";
    import AbonnementEven from '$lib/components/boites/abonnementEven.svelte';
    import AbonnementExposant from '$lib/components/boites/abonnementExposant.svelte';

    export let data;
    const produit = data.produit;
    const abonne = data.abonne;

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
            <H1Title title={produit.nom} />
            {produit.desc}<br><br>

            {#if produit.type.nom !== "abonnement"}
                Prix abonné: {produit.prix_a}<br>
                Prix non-abonné: {produit.prix_v}<br>
            {:else}
                Prix: {produit.prix_v}<br>  <!-- MODIFIER POUR SÉLECTION ABONNEMENT CATÉGORIE/NB ÉVÉNEMENTS -->
            {/if}
            <BoutonGris lien={'/panier'} texte={'Acheter'} /> <!-- fonction={ajouterPanier} -->
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