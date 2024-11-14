
<script>
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import { loadScript } from "@paypal/paypal-js";
	  import { onMount } from "svelte";

    export let data;
    const paniers = data.paniers;
    const utilisateur = data.utilisateur;

    export let total = 10;
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
            //<!--! Ca c'est ce qui est declenché en retour si le paiement est valider
            return actions.order.capture().then(function (details) {
              alert("Paiement validé");
              //<!--!Ajouter un actions.redirect() pour changer de page
            });
          },
          onError: function (err) {
            //<!--! Et ca c'est quand ca a merdé
            alert("Quelque chose s'est mal passé");
            console.log("Quelque chose s'est mal passé", err);
          },
        })
        .render("#paypal-button-container");
    });
});
</script>

<div class="box">

  <H2Title title={"Récapitulatif de commande"} />

  <div class="content">
    <b>Liste d'items:</b>
    <ul>
        {#each paniers as panier}
        <li>{panier.produit.nom}</li>
        {/each}
    </ul>
  </div>

  <!--! La div pour le bouton paypal  -->
  <div id="paypal-button-container"></div>

</div>


  

