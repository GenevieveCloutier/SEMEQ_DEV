
<script>
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import BoutonGris from "$lib/components/boutons/boutonGris.svelte";
    import Etape2 from "$lib/components/barre_progression_paiement/etape2.svelte";
    import { loadScript } from "@paypal/paypal-js";
	  import { onMount } from "svelte";
    import Paypal from "$lib/components/paypal.svelte";
    import StorageAbonnements from '$lib/data/storageAbonnements.json';

    export let data;
    const utilisateur = data.utilisateur;

    let typeAbonnement = '';

    //tranformer le fichier json en tableau
    const tableauAbonnements = Object.entries(StorageAbonnements).map(([key, value]) => ({
      id: key,
      ...value,
        }));

    let nomAbonnement = "";
    let sousTotal = "";
    let totalToSend = "";
    let type ="";
    let redirection = '';

    onMount(() => {
      // Récupération de la valeur de typeAbonnement
      typeAbonnement = localStorage.getItem('typeAbonnement');
      let id=typeAbonnement;
      typeAbonnement = tableauAbonnements.find((abonnement) => abonnement.id === id);
      sousTotal = typeAbonnement.prix.toFixed(2);
      nomAbonnement = typeAbonnement.nom;
      let type = typeAbonnement.type;

      //afficher la bonne page après le paiement, selon si l'abonnement est un abonnement organisateur ou un abonnement exposant
      if(type === "organisateur"){
        redirection = window.location.origin + `/panier/paiement/inscription_evenement_abonne`;
    }

      if(type === "exposant"){
          redirection = window.location.origin + `/panier/paiement/confirmation`;
      }

    // Calcul TPS, TVQ et total
    /*const tpsTaux = 0.05;
    const tvqTaux = 0.09975;
    let tps = sousTotal * tpsTaux;
    let tvq = sousTotal * tvqTaux;*/
    totalToSend = sousTotal /* + tps + tvq*/;

      return {nomAbonnement, sousTotal, redirection}
    });


    // Calcul TPS, TVQ et total
    /*const tpsTaux = 0.05;
    const tvqTaux = 0.09975;
    let tps = sousTotal * tpsTaux;
    let tvq = sousTotal * tvqTaux;*/
    totalToSend = sousTotal /* + tps + tvq*/;
    



</script>

<Etape2/>

<div class="container is-max-desktop is-narrow box">

  <H2Title title={"Récapitulatif de commande"} />

  <table class="table is-narrow no-border-table">
    <thead>
      <tr>
        <th>Liste d'items :</th>
        <th>Prix</th>
      </tr>
    </thead>
    <tbody>
      <td>{nomAbonnement}</td>
      <td>{sousTotal}$</td>
    </tbody>
  </table>
  
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

  <div class="container is-flex is-justify-content-right is-align-items-right mb-6">
    <p><strong>Total: </strong> {totalToSend}$</p>
  </div>

  <!-- La div pour le bouton paypal -->
   <div class="container is-flex is-justify-content-right is-align-items-right">
    <Paypal total={totalToSend} redirection={redirection} donneesClient={utilisateur} paypal_id={data.PAYPAL_CLIENT_ID}/>
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
