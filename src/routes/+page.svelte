<script>
      
  export let data;
  const { users, session } = data;
      
      import { handleUserDelete } from "$lib/outils/formHandlers";

</script>

<h1 class="title">Accueil</h1>
{#each users as user}
<div class="box">
      <form on:submit|preventDefault={handleUserDelete}>
            <p>Courriel: {user.courriel}</p>
            <p>id: {user.id}</p>
            <input type="text" name="id" value="{user.id}">
            <button type="submit" class="button">Supprimer</button>
      </form>
      
      
</div>
      
{/each}{#if session}
<h2>{session}</h2>
{/if}
<a href="./createaccount" class="button">Nouveau compte</a>
