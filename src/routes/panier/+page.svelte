
<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import BoutonGris from "$lib/components/boutons/boutonGris.svelte";
    import Retour from "$lib/components/generaux/retour.svelte";
    import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
    import AbonnementEven from '$lib/components/boites/abonnementEven.svelte';
    import AbonnementExposant from '$lib/components/boites/abonnementExposant.svelte';
    import NotifSuccess from '$lib/components/notifications/notifSuccess.svelte';
	import NotifDanger from '$lib/components/notifications/notifDanger.svelte';
    import { deleteOnePanier } from '$lib/outils/formHandlers';
    import confirmation from '$lib/components/notifications/confirmation.svelte';

    export let data;
    const paniers = data.paniers;
    const utilisateur = data.utilisateur;

    // Calcul économie
    let economie = paniers.reduce((acc, panier) => {
        return acc + (panier.produit.prix_v - panier.produit.prix_a);
    }, 0);

    // Calcul sous-total
    let sousTotal = paniers.reduce((acc, panier) => {
        let prix = utilisateur.abonne ? panier.produit.prix_a : panier.produit.prix_v;
        return acc + prix;
    }, 0);

    // Calcul TPS, TVQ et total
    /*const tpsTaux = 0.05;
    const tvqTaux = 0.09975;
    let tps = sousTotal * tpsTaux;
    let tvq = sousTotal * tvqTaux;*/
    let total = sousTotal/* + tps + tvq*/;
</script>

<H1Title title={"Panier"} />

<div class="container is-fluid">

    <NotifSuccess />
    <NotifDanger />

    {#if paniers.length === 0}
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

        {:else}
        <!-- Boutons supprimer produits/vider panier -->
        <div class="columns is-1">
            <div class="column is-narrow">
                <form> <!-- on:submit|preventDefault={deleteSelectedCart} -->
                    <input type="hidden" name="produit_id" /> <!-- value={produit.id} -->
                    <button type="submit" class="button is-danger is-outlined">Supprimer les éléments</button>
                </form>
            </div>
            <!--<div class="column">
                <Confirmation utilisateur_id={utilisateur.id} />
            </div>-->
        </div>

        <div class="columns">
            <div class="column is-three-quarters">
                <table class="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th></th> <!-- Cases sélectionner pour suppression -->
                            <th>PRODUIT</th>
                            <th>TYPE</th>
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
                                    <div class="tronquer-desc-2lignes"><i>{panier.produit.desc}</i></div>
                                </td>
                                <td>{panier.produit.type.nom}</td>
                                {#if utilisateur.abonne === true}
                                    <td>{panier.produit.prix_a === 0 ? "Gratuit" : `${panier.produit.prix_a.toFixed(2)} $`}</td>
                                {:else}
                                    <td>{panier.produit.prix_v === 0 ? "Gratuit" : `${panier.produit.prix_v.toFixed(2)} $`}</td>
                                {/if}
                                <td class="has-text-centered">
                                    <form on:submit|preventDefault={deleteOnePanier}>
                                        <input type="hidden" name="panier_id" value={panier.id} />
                                        <button type="submit" class="button"> <span class="icon"><i class="fa-regular fa-trash-can" style="color: #000000;"></i></span> </button>
                                    </form>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>

            <!-- Récapitulatif de commande -->
            <div class="column is-one-quarter">
                <div class="box">
                    <div class="block has-text-centered"><H2Title title={"Récapitulatif de commande"} /></div>
                    <div class="block">
                        {#if economie !== 0} <!-- Afficher s'il y a une économie -->
                            {#if utilisateur.abonne === true}
                            <div class="block">  
                                En étant abonné, tu économises <b>{`${economie.toFixed(2)} $`}</b> sur ta commande!<br>
                            </div>
                            {:else}
                            <div class="block">    
                                En étant abonné, tu économiserais <b>{`${economie.toFixed(2)} $`}</b> en plus de profiter de plusieurs avantages exclusifs!<br>
                            </div>
                            {/if}
                        {/if}

                        <!--<div class="columns">
                            <div class="column">
                            Sous-total :<br>
                            TPS (5%) :<br>
                            TVQ (9,975%) :
                            </div>

                            <div class="column is-narrow has-text-right">
                                {sousTotal === 0 ? "Gratuit" : `${sousTotal.toFixed(2)} $`}<br>
                                {tps.toFixed(2)} $<br>
                                {tvq.toFixed(2)} $
                            </div>
                        </div>-->

                        <form class="block">
                            <label class="label" for="code_promo">Tu as un code promo?</label>
                            <div class="field has-addons">
                                <p class="control">
                                    <input class="input" name="code_promo" type="text" placeholder="Code promo">
                                </p>
                                <p class="control">
                                    <button type="submit" class="button" id="btn_code_promo">Appliquer</button>
                                </p>
                            </div>
                        </form>

                        <div class="columns">
                            <div class="column">
                                <b>Total :</b>
                            </div>
                            <div class="column is-narrow has-text-right">
                                <b>{total === 0 ? "Gratuit" : `${total.toFixed(2)} $`}</b>
                            </div>
                        </div>
                    </div>

                    <div class="block has-text-centered">
                        <SubmitButon texte={'Valider et payer'} />
                    </div>                
                </div>
            </div>
        </div>

        <div class="block has-text-right">
            <Retour />
        </div>
    {/if}

</div>


<style>
    /* Centrer verticalement le texte dans les lignes du tableau */
    td {
        height: 100%;
        vertical-align: middle;
    }
    
    /* Limiter la taille de la zone de texte des descriptions de produits sur 2 lignes */
    .tronquer-desc-2lignes {
            display: -webkit-box;
            line-clamp: 2;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
    }
</style>