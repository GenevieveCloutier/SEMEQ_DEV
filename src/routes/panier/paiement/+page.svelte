
<script>
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import Retour from "$lib/components/generaux/retour.svelte";
    import Etape2 from "$lib/components/barre_progression_paiement/etape2.svelte";
    import Paypal from "$lib/components/paypal.svelte";
    import { codePromoPanier } from '$lib/outils/formHandlers';

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

    // Calcul rabais, TPS, TVQ et total
    /*const tpsTaux = 0.05;
    const tvqTaux = 0.09975;
    let tps = sousTotal * tpsTaux;
    let tvq = sousTotal * tvqTaux;*/
    let rabais = 0;   /* Code promo en % */
    let totalToSend = sousTotal - rabais/* + tps + tvq*/;
    let redirection = window.location.origin +`/panier/paiement/confirmation`;

</script>

<Etape2/>

<div class="container is-max-desktop is-narrow box">

  <H2Title title={"Récapitulatif de commande"} />

  <table class="table is-narrow no-border-table">
    <thead>
      <tr>
        <th>Liste d'items :</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each paniers as panier}
      <tr>
        <td>{panier.produit.nom}</td>
        <td >{panier.produit.type.nom}</td>
        {#if utilisateur.abonne === true}
              <td class="has-text-right">{panier.produit.prix_a === 0 ? "Gratuit" : `${panier.produit.prix_a.toFixed(2)} $`}</td>
          {:else}
              <td class="has-text-right">{panier.produit.prix_v === 0 ? "Gratuit" : `${panier.produit.prix_v.toFixed(2)} $`}</td>
        {/if}
      </tr>
      {/each}
    </tbody>
  </table>

  <div class="block has-text-right">
    {#if economie !== 0} <!-- Afficher s'il y a une économie -->
        {#if utilisateur.abonne === true}
        <p>En étant abonné, tu économises <b>{`${economie.toFixed(2)} $`}</b> sur ta commande!<br></p>
        {:else}
        <p>En étant abonné, tu économiserais <b>{`${economie.toFixed(2)} $`}</b> en plus de profiter de plusieurs avantages exclusifs!<br></p>
        {/if}
    {/if}
    
    <div class="columns">
      <div class="column has-text-right">
          {#if rabais !== 0} <!-- Afficher s'il y a un rabais -->  
            <b>Rabais :</b><br>
          {/if}
          <b>Total :</b>
      </div>
      <div class="column is-narrow has-text-right">
        {#if rabais !== 0}
          <b>{rabais.toFixed(2)} $</b><br>
        {/if}
        <b>{totalToSend === 0 ? "Gratuit" : `${totalToSend.toFixed(2)} $`}</b>
      </div>
    </div>
  </div>
  
  <form on:submit|preventDefault={codePromoPanier} class="block">
    <label class="label" for="code">Tu as un code promo?</label>
    <div class="field has-addons">
        <p class="control">
            <input class="input" name="code" id="code" type="text" placeholder="Code promo">
        </p>
        <p class="control">
            <button type="submit" class="button" id="btn_code_promo">Appliquer</button>
        </p>
    </div>
  </form>

  <!-- La div pour le bouton paypal -->
   <div class="container is-flex is-justify-content-center is-align-items-center">
    <Paypal total={totalToSend} redirection={redirection} donneesClient={data} paypal_id={data.PAYPAL_CLIENT_ID}/>
  </div>

  <div class="block has-text-right">
    <Retour />
  </div>
</div>
