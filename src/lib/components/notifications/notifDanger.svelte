<script>
  import { erreur } from "../../outils/formHandlers";
  
  $: if ($erreur) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<div class="block">
    {#if $erreur}
    <div class="notification is-danger has-text-centered">
        <p>{$erreur}</p>
    </div>
    {/if}
</div>