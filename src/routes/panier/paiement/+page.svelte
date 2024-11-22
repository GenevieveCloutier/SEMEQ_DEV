
<script>
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import Retour from "$lib/components/generaux/retour.svelte";
    import Etape2 from "$lib/components/barre_progression_paiement/etape2.svelte";
    import { loadScript } from "@paypal/paypal-js";
	  import { onMount } from "svelte";

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
    let totalToSend = sousTotal/* + tps + tvq*/;

    export let total = totalToSend;

    //<!--! La pour le test j'ai mis la clé directement ici, mais va falloir la mettre en dotenv
    const CLIENT_ID = "AVjfN3RipHRH5MAlrzQyfJGb65Niols6HURmiL0dmpuzVh63eOAaJcheLD7jKdReHi6sQp1z1B4wp-1c";
    onMount(() => {
    loadScript({ "client-id": CLIENT_ID, currency: "CAD" }).then((paypal) => {
      paypal
        .Buttons({
          style: {
            color: "blue",
          },
          createOrder: function (data, actions) {
            //<!--! la on envoie les parametres de la commande, avec le montant total seulement
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: total,
                  },
                },
              ],
            });
          },
          onApprove: function (data, actions) {
            //<!--! Ça c'est ce qui est declenché en retour si le paiement est validé
            return actions.order.capture().then(function (details) {
              alert("Paiement validé");
              actions.redirect(`/panier/paiement/confirmation`)
            });
          },
          onError: function (err) {
            //<!--! Et ça c'est quand ça a merdé
            alert("Quelque chose s'est mal passé");
            console.log("Quelque chose s'est mal passé", err);
          },
        })
        .render("#paypal-button-container");
    });
});
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
          <b>Total :</b>
      </div>
      <div class="column is-narrow has-text-right">
          <b>{total === 0 ? "Gratuit" : `${total.toFixed(2)} $`}</b>
      </div>
    </div>
  </div>
  
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

  <!-- La div pour le bouton paypal -->
   <div class="container is-flex is-justify-content-center is-align-items-center">
    <div id="paypal-button-container"></div>
  </div>

  <div class="block has-text-right">
    <Retour />
  </div>
</div>

<style>
  .no-border-table ,
  .no-border-table th,
  .no-border-table td {
    border: none;
  }

  #paypal-button-container {
    width: 80%;
  }
</style>