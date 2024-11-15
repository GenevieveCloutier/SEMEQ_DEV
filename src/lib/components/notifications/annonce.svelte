<script>
	import { fade, fly } from "svelte/transition";
  //<!--? J'ai changer la variable pour la meme chose que les notifs danger,
  //<!--? si j'ai casser quelque chose que vous qviez faite je trouverais une autre solution
    // export let success
    import { annonce } from "../../outils/formHandlers";

</script>

{#if $annonce}
<div class="box has-text-centered popup" in:fly={{y:200, duration: 1500}} out:fly={{y:-200, duration: 1500}}>
    <p><span class="icon is-large"><i class="fa-regular fa-face-sad-tear fa-xl"></i></span></p>
    <p>Ho non! Votre abonnement est arrivé a son terme.</p>
    <br>
    <p>Pas de panique, toutes vos données sont encores là, mais vous n'avez plus accès aux fonctionnalités d'un compte abonné.</p>
    <p class="block">Renouvelez votre abonnement pour récupérer tout vos avantages.</p>
      <a href="/boutique" class="button is-primary-blue">Aller à la boutique</a>
      <a href="/" class="help" on:click|preventDefault={()=> (annonce.set(''))}>Continuer en tant que membre gratuit.</a>

</div>
{/if}


<style>
    .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999; /* Mettre un z-index élevé pour être au-dessus de tout */
}
.help{
  color: grey;
}
</style>