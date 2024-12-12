
<script>
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import BoutonGris from "$lib/components/boutons/boutonGris.svelte";
    import Etape2 from "$lib/components/barre_progression_paiement/etape2.svelte";
    import { loadScript } from "@paypal/paypal-js";
	  import { onMount } from "svelte";
    import Paypal from "$lib/components/paypal.svelte";
    import StorageAbonnements from '$lib/data/storageAbonnements.json';
    import NotifSuccess from '$lib/components/notifications/notifSuccess.svelte';
	  import NotifDanger from '$lib/components/notifications/notifDanger.svelte';
    import { codePromoAbonnement, rabais } from '$lib/outils/formHandlers';

    export let data;
    const utilisateur = data.utilisateur;

    let typeAbonnement = '';

    //tranformer le fichier json en tableau
    const tableauAbonnements = Object.entries(StorageAbonnements).map(([key, value]) => ({
      id: key,
      ...value,
        }));

    let nomAbonnement = "";
    let sousTotal = 0;
    let totalToSend = 0;
    let type = "";
    let redirection = '';
    let prixAvecRabais = 0;

    onMount(() => {
      // Récupération de la valeur de typeAbonnement
      typeAbonnement = localStorage.getItem('typeAbonnement');
      let id=typeAbonnement;
      typeAbonnement = tableauAbonnements.find((abonnement) => abonnement.id === id);
      sousTotal = typeAbonnement.prix.toFixed(2);
      type = typeAbonnement.type;
      nomAbonnement = typeAbonnement.nom;

      if (type==="exposant") {
        redirection = window.location.origin + `/panier/paiement/confirmation`;
      };
      if (type==="organisateur") {
        redirection = window.location.origin + `/panier/paiement/inscription_evenement_abonne`;
      }

      totalToSend = sousTotal;

        return {nomAbonnement, sousTotal, redirection}
    });

    totalToSend = sousTotal;

    // Calculer les prix avec rabais
    $: prixAvecRabais = (sousTotal * (1 - $rabais)).toFixed(2);

    // Calculer le total avec rabais
    $: totalToSend = prixAvecRabais;
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
        <th>Abonnements</th>
        {#if $rabais !== 0}
          <th class="has-text-right">Prix</th> <!-- Colonne pour les prix réguliers barrés si code promo applicable -->
          <th></th> <!-- Colonne pour afficher les prix avec rabais calculé dessus -->
        {:else}
          <th>Prix</th> <!-- Colonne pour les prix réguliers sans code promo appliqué -->
        {/if}
      </tr>
    </thead>
    <tbody>
      <td>{nomAbonnement}</td>
      {#if $rabais !== 0}
        <td class="has-text-right"><del>{sousTotal}$</del></td>
        <td class="has-text-right">{prixAvecRabais}$</td>
      {:else}
        <td>{sousTotal}$</td>
      {/if}
    </tbody>
  </table>
  
  <div class="block">
    <form on:submit|preventDefault={codePromoAbonnement}>
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
        {#if $rabais !== 0}
          Sous-total :<br>
          Rabais :<br>
        {/if}
        <b>Total :</b>
    </div>
    <div class="column is-narrow has-text-right">
      {#if $rabais !== 0}
        {sousTotal}$<br>
        {(sousTotal - prixAvecRabais).toFixed(2)} $<br>
      {/if}
      <b>{totalToSend}$</b>
    </div>
  </div>

  <!-- La div pour le bouton paypal -->
   <div class="container is-flex is-justify-content-center is-align-items-center">
    <Paypal total={totalToSend} redirection={redirection} donneesClient={data} paypal_id={data.PAYPAL_CLIENT_ID}/>
  </div>

  <div class="block has-text-left">
    <BoutonGris texte={"Annuler"} lien={"/organisateur"} />
  </div>
</div>

<style>
  th, td{
    width: 100%;
  }
</style>
