
<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import { loadScript } from "@paypal/paypal-js";
	  import { onMount } from "svelte";
    import { achatReussi } from '$lib/outils/formHandlers';
    import { erreur } from '$lib/outils/formHandlers';
	import { activeAbonnement } from "../outils/formHandlers";
    

    export let total;
    export let redirection;
    export let donneesClient;
    export let paypal_id;
    console.log(donneesClient);
    
    onMount(() => {
    loadScript({ "client-id": paypal_id, currency: "CAD" }).then((paypal) => {
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
              if (window.location.pathname.split('/').pop() == 'paiement_abonnement') {
                activeAbonnement(donneesClient.id);
              }
              achatReussi(donneesClient);
              console.log("Paiement validé");
              actions.redirect(redirection);
            });
          },
          onError: function (err) {
            //<!--! Et ca c'est quand ca a merdé
              erreur.set("Un problème est survenue lors de la communication avec Paypal.\nVeuillez réessayer.")
            console.log("Quelque chose s'est mal passé", err);
          },
        })
        .render("#paypal-button-container");
    });
});
</script>
<!--! La div pour le bouton paypal  -->
    <div id="paypal-button-container"></div>



  

