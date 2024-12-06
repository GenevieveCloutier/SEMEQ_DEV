<script>
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import Retour from "$lib/components/generaux/retour.svelte";
    import Etape2 from "$lib/components/barre_progression_paiement/etape2.svelte";
    import Paypal from "$lib/components/paypal.svelte";
    import NotifSuccess from '$lib/components/notifications/notifSuccess.svelte';
	  import NotifDanger from '$lib/components/notifications/notifDanger.svelte';
    import { codePromoPanier, rabais, codeProduitId, codeTypeId } from '$lib/outils/formHandlers';

    export let data;
    const paniers = data.paniers;
    const utilisateur = data.utilisateur;
    
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

    import { onMount } from 'svelte';
    let redirection = '';
    onMount(() => {
        redirection = window.location.origin + `/panier/paiement/confirmation`;
    });
</script>

<div class="container is-fluid">
  <Etape2/>

  <NotifSuccess />
  <NotifDanger />
</div>

<div class="container is-max-desktop is-narrow box">

  <H2Title title={"Récapitulatif de commande"} />

  <table class="table">
    <thead>
      <tr>
        <th>Produits</th>
        <th></th>
        {#if $rabais !== 0}
          <th></th> <!-- Colonne pour les prix réguliers dont ceux avec un rabais appliqué sont barrés -->
          <th></th> <!-- Colonne pour afficher les prix avec rabais calculé dessus -->
        {:else}
          <th></th> <!-- Colonne pour les prix réguliers -->
        {/if}
      </tr>
    </thead>
    <tbody>
      {#each paniers as panier, index}
      <tr>
        <td>{panier.produit.nom}</td>
        <td >{panier.produit.type.nom}</td>

        {#if $rabais !== 0}
          {#if utilisateur.abonne === true} <!-- Affichages prix abonnés SI rabais -->
            {#if prixAvecRabais[index] !== panier.produit.prix_a} <!-- Rayer texte si rabais applicable sur le produit -->
              <td class="has-text-right"><del>{panier.produit.prix_a === 0 ? "Gratuit" : `${panier.produit.prix_a.toFixed(2)} $`}</del></td>
              <td class="has-text-right">{prixAvecRabais[index] === 0 ? "Gratuit" : `${prixAvecRabais[index].toFixed(2)} $`}</td>
            {:else} <!-- Ne PAS rayer texte si rabais NON applicable sur le produit -->
              <td class="has-text-right">{panier.produit.prix_a === 0 ? "Gratuit" : `${panier.produit.prix_a.toFixed(2)} $`}</td>
              <td class="has-text-right"></td>
            {/if}
          {:else} <!-- Affichages prix non-abonnés SI rabais -->
            {#if prixAvecRabais[index] !== panier.produit.prix_v} <!-- Rayer texte si rabais applicable sur le produit -->
              <td class="has-text-right"><del>{panier.produit.prix_v === 0 ? "Gratuit" : `${panier.produit.prix_v.toFixed(2)} $`}</del></td>
              <td class="has-text-right">{prixAvecRabais[index] === 0 ? "Gratuit" : `${prixAvecRabais[index].toFixed(2)} $`}</td>
            {:else} <!-- Ne PAS rayer texte si rabais NON applicable sur le produit -->
              <td class="has-text-right">{panier.produit.prix_v === 0 ? "Gratuit" : `${panier.produit.prix_v.toFixed(2)} $`}</td>
              <td class="has-text-right"></td>
            {/if}
          {/if}
        {:else} <!-- Affichages prix réguliers abonnés ou non-abonnés si PAS de rabais -->
          {#if utilisateur.abonne === true}
            <td class="has-text-right">{panier.produit.prix_a === 0 ? "Gratuit" : `${panier.produit.prix_a.toFixed(2)} $`}</td>
          {:else}
            <td class="has-text-right">{panier.produit.prix_v === 0 ? "Gratuit" : `${panier.produit.prix_v.toFixed(2)} $`}</td>
          {/if}
        {/if}
        
      </tr>
      {/each}
    </tbody>
  </table>

  <div class="block has-text-right">
    {#if economie !== 0} <!-- Afficher s'il y a une économie -->
        {#if utilisateur.abonne === true}
        <p>Avec ton abonnement, tu économises <b>{`${economie.toFixed(2)} $`}</b> sur ta commande!<br></p>
        {:else}
        <p>En étant abonné, tu économiserais <b>{`${economie.toFixed(2)} $`}</b> en plus de profiter de plusieurs avantages exclusifs!<br></p>
        {/if}
    {/if}
    
    <div class="columns">
      <div class="column has-text-right">
          {#if $rabais !== 0}
            Sous-total :<br>
            Rabais :<br>
          {/if}
          <b>Total :</b>
      </div>
      <div class="column is-narrow has-text-right">
        {#if $rabais !== 0}
          {sousTotal === 0 ? "Gratuit" : `${sousTotal.toFixed(2)} $`}<br>
          {(sousTotal - totalToSend).toFixed(2)} $<br>
        {/if}
        <b>{totalToSend === 0 ? "Gratuit" : `${totalToSend.toFixed(2)} $`}</b>
      </div>
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

  <!-- La div pour le bouton paypal -->
   <div class="container is-flex is-justify-content-center is-align-items-center">
    <Paypal total={totalToSend} redirection={redirection} donneesClient={data} paypal_id={data.PAYPAL_CLIENT_ID}/>
  </div>

  <div class="block has-text-right">
    <Retour />
  </div>
</div>