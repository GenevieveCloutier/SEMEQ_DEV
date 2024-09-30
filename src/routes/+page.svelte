<script>
      export let data;
      const users = data.users;
      
      import { handleUserDelete } from "/src/lib/outils/formHandlers";

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
      
{/each}
<a href="./createaccount" class="button">Nouveau compte</a>
<a href="./connexion" class="button">Connexion</a>
