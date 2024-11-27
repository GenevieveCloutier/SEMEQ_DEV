<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
    import Retour from "$lib/components/generaux/retour.svelte";
    import AbonnementEven from '$lib/components/boites/abonnementEven.svelte';
    import AbonnementExposant from '$lib/components/boites/abonnementExposant.svelte';
    import NotifDanger from '$lib/components/notifications/notifDanger.svelte';
    import { ajouterPanier, erreur } from '$lib/outils/formHandlers';

    export let data;
    const produit = data.produit;
    const utilisateur = data.utilisateur;

    // Variable prix_a_calcul pour faire fonctionner calcul economie si prix_a "Gratuit"
    let prix_a_calcul = produit.prix_a === "Gratuit" ? 0 : produit.prix_a;
    let economie = (parseFloat(produit.prix_v) - parseFloat(prix_a_calcul)).toFixed(2);
</script>

{#if $erreur}
    <div class="block">
        <NotifDanger></NotifDanger>
    </div>
{/if}

<div class="container is-fluid">

    <div class="columns">
        <div class="column is-one-third">
            <figure class="image is-1by1 ">
                <img src="{produit.photo}" alt="Photo {produit.nom}" />
            </figure>
        </div>

        <div class="column">
            <H1Title title={produit.nom} />

            <p>{produit.desc}<br><br>
                Prix abonné: {produit.prix_a}<br>
                Prix non-abonné: {produit.prix_v}
            </p><br><br>
           
            <div class="columns is-1">
                <div class="column is-narrow">
                    <form on:submit|preventDefault={ajouterPanier}>
                        <input type="hidden" name="produit_id" value={produit.id} />
                        <SubmitButon texte={'Acheter'} />
                    </form>
                </div>
                <div class="column">
                    <Retour />
                </div>
            </div>

        </div>
    </div>

    
    <div class="block">
        {#if utilisateur}
            {#if utilisateur.abonne === true}
                <!-- Afficher l'économie si prix_v et prix_a ne sont pas null ("Non défini") ET qu'il y a une différence entre les prix. -->
                {#if produit.prix_v !== "Non défini" && produit.prix_a !== "Non défini" && produit.prix_v !== produit.prix_a}    
                En étant membre, tu économises <b>{economie} $</b> en plus de profiter de plusieurs avantages exclusifs!<br>
                {/if}
            {:else}
                <H2Title title={"Abonnements"} />
                <!-- Afficher l'économie si prix_v et prix_a ne sont pas null ("Non défini") ET qu'il y a une différence entre les prix. -->
                {#if produit.prix_v !== "Non défini" && produit.prix_a !== "Non défini" && produit.prix_v !== produit.prix_a}
                    En étant membre, tu économiserais <b>{economie} $</b> en plus de profiter de plusieurs avantages exclusifs!<br><br>
                {/if}
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
            {/if}
        {:else}
            <H2Title title={"Abonnements"} />
            <!-- Afficher l'économie si prix_v et prix_a ne sont pas null ("Non défini") ET qu'il y a une différence entre les prix. -->
            {#if produit.prix_v !== "Non défini" && produit.prix_a !== "Non défini" && produit.prix_v !== produit.prix_a}
                En étant membre, tu économiserais <b>{economie} $</b> en plus de profiter de plusieurs avantages exclusifs!<br><br>
            {/if}
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
        {/if}
    </div>

</div>