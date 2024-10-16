<script>
  import { erreur } from "../../outils/formHandlers";
</script>

<div class="block">
    {#if $erreur}
    <div class="notification is-danger has-text-centered">
        <p>{$erreur}</p>
    </div>
    {/if}
</div>