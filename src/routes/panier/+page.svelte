<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import BoutonGris from "$lib/components/boutons/boutonGris.svelte";
    import Retour from "$lib/components/generaux/retour.svelte";
    import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
    import AbonnementEven from '$lib/components/boites/abonnementEven.svelte';
    import AbonnementExposant from '$lib/components/boites/abonnementExposant.svelte';

    export let data;
    const paniers = data.paniers;
    const utilisateur = data.utilisateur;
</script>

<H1Title title={"Panier"} />

<div class="container is-fluid">

    {#if paniers}
    <!-- Boutons supprimer produits/vider panier -->
    
        <div class="columns">
            <div class="column is-three-quarters">
                <table class="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th></th> <!-- Cases sélectionner pour suppression -->
                            <th>PRODUIT</th>
                            <th>TYPE DE PRODUIT</th>
                            <th>PRIX</th>
                            <th class="has-text-centered">RETIRER</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each paniers as panier}
                            <tr>
                                <td>
                                    <div class="field has-text-centered">
                                        <div class="control">
                                            <input type="checkbox" id="produit_select" value={panier.id}>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {panier.produit.nom}<br>
                                    <i>{panier.produit.desc}</i>
                                </td>                               
                                <td>{panier.produit.type.nom}<br>produit_id:{panier.produit_id}</td>
                                {#if utilisateur.abonne === true}
                                    <td>{panier.produit.prix_a}</td>
                                {:else}
                                    <td>{panier.produit.prix_v}</td>
                                {/if}
                                <td class="has-text-centered"> <!--on:click={supprimerProduitPanier}-->
                                    <button class="button"> <span class="icon"><i class="fa-regular fa-trash-can" style="color: #000000;"></i></span> </button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>

            <!-- Récapitulatif de commande -->
            <div class="column is-one-quarter">
                <div class="box">
                    Récapitulatif de commande
                </div>
            </div>
        </div>

        <div class="columns is-1 has-text-right">
            <div class="column is-narrow">
                <SubmitButon texte={'Passer au paiement'} />
            </div>
            <div class="column">
                <Retour />
            </div>
        </div>
    {:else}
        <section class="section has-text-centered">
            <p class="subtitle">Ton panier est vide.</p>

            <BoutonGris lien={'/boutique#formations'} texte={"Voir les formations"} />
            <BoutonGris lien={'/boutique#outils'} texte={"Voir les outils"} />

            {#if utilisateur.abonne !== true}
            <br><br>
            <hr>
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
        </section>
    {/if}

</div>