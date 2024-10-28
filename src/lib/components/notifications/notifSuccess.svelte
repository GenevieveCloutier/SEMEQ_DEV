<script>
	import { fade, fly } from "svelte/transition";
  //<!--? J'ai changer la variable pour la meme chose que les notifs danger,
  //<!--? si j'ai casser quelque chose que vous qviez faite je trouverais une autre solution
    // export let success
    import { success } from "../../outils/formHandlers";

  function supprimerNotification(event) {
    event.target.parentNode.remove();
  }

  //<!--* J'ai ajouter un setTimeout pour enlever la notif automatiquement aprés 2 secondes d'affichage
  $: if ($success) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      success.set(null);
    }, 2000);
  }
</script>

<div class="block">
    {#if $success}
    <div class="notification is-success has-text-centered" out:fly={{y: -400, duration: 2000}}> <!--* Plus 2 secondes de fade out/ fly out ?  -->
        <button class="delete" on:click={supprimerNotification}></button>
        <p>{$success}</p>
    </div>
    {/if}
</div>
