
<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import { loadScript } from "@paypal/paypal-js";
	import { onMount } from "svelte";

    export let total;
    export let redirection;
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
              console.log("Paiement validé");
              actions.redirect(redirection);
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
<!--! La div pour le bouton paypal  -->
    <div id="paypal-button-container"></div>



  

