
<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import BoutonGris from "$lib/components/boutons/boutonGris.svelte";
    import Retour from "$lib/components/generaux/retour.svelte";
    import AbonnementEven from '$lib/components/boites/abonnementEven.svelte';
    import AbonnementExposant from '$lib/components/boites/abonnementExposant.svelte';
    import NotifSuccess from '$lib/components/notifications/notifSuccess.svelte';
	import NotifDanger from '$lib/components/notifications/notifDanger.svelte';
    import { deleteOnePanier, deleteSelectedItemsCart, codePromoPanier, rabais, codeProduitId, codeTypeId } from '$lib/outils/formHandlers';
    import Confirmation from '$lib/components/notifications/confirmation.svelte';

    export let data;
    const paniers = data.paniers;
    const utilisateur = data.utilisateur;

    // Pour supprimer plusieurs produits du panier
    let selectedItems = [];
    function handleCheckboxChange(event) {
        const itemId = event.target.value;
        if (event.target.checked) {
            selectedItems = [...selectedItems, itemId];
        } else {
            selectedItems = selectedItems.filter(id => id !== itemId);
        }
    }

    // Calcul économie abonné/non-abonné
    let economie = paniers.reduce((acc, panier) => {
        return acc + (panier.produit.prix_v - panier.produit.prix_a);
    }, 0);

    // Calcul sous-total
    let sousTotal = paniers.reduce((acc, panier) => {
        let prix = utilisateur.abonne ? panier.produit.prix_a : panier.produit.prix_v;
        return acc + prix;
    }, 0);

    let totalToSend = sousTotal;

    // Fonction pour calculer le prix avec rabais
    function calculerPrixAvecRabais(panier, rabais, codeProduitId, codeTypeId, utilisateur) {
        let prix = utilisateur.abonne ? panier.produit.prix_a : panier.produit.prix_v;
        if (codeProduitId && panier.produit.id === codeProduitId) {
            prix = prix * (1 - rabais);
        } else if (codeTypeId && panier.produit.type_id === codeTypeId) {
            prix = prix * (1 - rabais);
        }
        return prix;
    }

    // Calculer les prix avec rabais
    $: prixAvecRabais = paniers.map(panier => {
        return calculerPrixAvecRabais(panier, $rabais, $codeProduitId, $codeTypeId, utilisateur);
    });

    // Calculer le total avec rabais
    $: totalToSend = prixAvecRabais.reduce((acc, prix) => acc + prix, 0);
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
                <form on:submit|preventDefault={deleteSelectedItemsCart}>
                    <input type="hidden" name="utilisateur_id" value={utilisateur.id} />
                    <input type="hidden" name="selectedItems" value={selectedItems.join(',')} />
                    <button type="submit" class="button is-danger is-outlined">Supprimer les produits</button>
                </form>
            </div>
            <div class="column">
                <Confirmation but='panier' id={utilisateur.id} />
            </div>
        </div>

        <div class="columns">
            <div class="column is-three-quarters">
                <table class="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th></th> <!-- Cases sélectionner pour suppression -->
                            <th>PRODUIT</th>
                            <th>TYPE</th>
                            {#if $rabais !== 0}
                                <th class="has-text-right">PRIX</th> <!-- Colonne pour les prix réguliers dont ceux avec un rabais appliqué sont barrés -->
                                <th></th> <!-- Colonne pour afficher les prix avec rabais calculé dessus -->
                            {:else}
                                <th>PRIX</th>
                            {/if}
                            <th class="has-text-centered">RETIRER</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each paniers as panier, index}
                            <tr>
                                <td>
                                    <div class="field has-text-centered">
                                        <div class="control">
                                            <input type="checkbox" id="selectItem" value={panier.id} on:change={handleCheckboxChange}>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {panier.produit.nom}<br>
                                    <div class="tronquer-desc-2lignes"><i>{panier.produit.desc}</i></div>
                                </td>
                                <td>{panier.produit.type.nom}</td>

                                {#if $rabais !== 0}
                                    {#if utilisateur.abonne === true} <!-- Affichages prix abonnés SI rabais -->
                                        {#if prixAvecRabais[index] !== panier.produit.prix_a} <!-- Rayer texte si rabais applicable sur le produit -->
                                            <td><del>{panier.produit.prix_a === 0 ? "Gratuit" : `${panier.produit.prix_a.toFixed(2)} $`}</del></td>
                                            <td>{prixAvecRabais[index] === 0 ? "Gratuit" : `${prixAvecRabais[index].toFixed(2)} $`}</td>
                                        {:else} <!-- Ne PAS rayer texte si rabais NON applicable sur le produit -->
                                            <td>{panier.produit.prix_a === 0 ? "Gratuit" : `${panier.produit.prix_a.toFixed(2)} $`}</td>
                                            <td></td>
                                        {/if}
                                    {:else} <!-- Affichages prix non-abonnés SI rabais -->
                                        {#if prixAvecRabais[index] !== panier.produit.prix_v} <!-- Rayer texte si rabais applicable sur le produit -->
                                            <td><del>{panier.produit.prix_v === 0 ? "Gratuit" : `${panier.produit.prix_v.toFixed(2)} $`}</del></td>
                                            <td>{prixAvecRabais[index] === 0 ? "Gratuit" : `${prixAvecRabais[index].toFixed(2)} $`}</td>
                                        {:else} <!-- Ne PAS rayer texte si rabais NON applicable sur le produit -->
                                            <td>{panier.produit.prix_v === 0 ? "Gratuit" : `${panier.produit.prix_v.toFixed(2)} $`}</td>
                                            <td></td>
                                        {/if}
                                    {/if}
                                    {:else} <!-- Affichages prix réguliers abonnés ou non-abonnés si PAS de rabais -->
                                        {#if utilisateur.abonne === true}
                                            <td>{panier.produit.prix_a === 0 ? "Gratuit" : `${panier.produit.prix_a.toFixed(2)} $`}</td>
                                        {:else}
                                            <td >{panier.produit.prix_v === 0 ? "Gratuit" : `${panier.produit.prix_v.toFixed(2)} $`}</td>
                                        {/if}
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
                                Avec ton abonnement, tu économises <b>{`${economie.toFixed(2)} $`}</b> sur ta commande!<br>
                            </div>
                            {:else}
                            <div class="block">    
                                En étant abonné, tu économiserais <b>{`${economie.toFixed(2)} $`}</b> en plus de profiter de plusieurs avantages exclusifs!<br>
                            </div>
                            {/if}
                        {/if}

                        <div class="columns">
                            <div class="column has-text-right">
                            {#if $rabais !== 0}
                                Sous-total :<br>
                                Rabais :<br>
                            {/if}
                            </div>

                            <div class="column is-narrow has-text-right">
                                {#if $rabais !== 0}
                                    {sousTotal === 0 ? "Gratuit" : `${sousTotal.toFixed(2)} $`}<br>
                                    {(sousTotal - totalToSend).toFixed(2)} $<br>
                                {/if}
                            </div>
                        </div>

                        <div class="block">
                            <form on:submit|preventDefault={codePromoPanier}>
                                <label class="label" for="code">Tu as un code promo?</label>
                                <div class="field has-addons">
                                    <p class="control">
                                        <input class="input" name="code" id="code" type="text" placeholder="Code promo" required>
                                    </p>
                                    <p class="control">
                                        <button type="submit" class="button" id="btn_code_promo">Appliquer</button>
                                    </p>
                                </div>
                            </form>
                        </div>

                        <div class="columns">
                            <div class="column has-text-right">
                                <b>Total :</b>
                            </div>
                            <div class="column is-narrow has-text-right">
                                <b>{totalToSend === 0 ? "Gratuit" : `${totalToSend.toFixed(2)} $`}</b>
                            </div>
                        </div>
                    </div>

                    <div class="block has-text-centered">
                        <a href="/panier/paiement">
                            <button id="paiement" type="submit" class="button is-dark" style="background-color: #053682; color:white">Valider et payer</button>
                        </a>
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