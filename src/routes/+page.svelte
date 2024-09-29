<script>
      export let data;
      const users = data.users;
      
</script>

<h1 class="title">Accueil</h1>
{#each users as user}
<div class="box">
      <form on:submit|preventDefault={handleDeleteUser(user.id)}>
            <p>Courriel: {user.courriel}</p>
            <button type="submit" class="button">Supprimer</button>
      </form>
      
      
</div>
      
{/each}
<a href="./createaccount" class="button">Nouveau compte</a>
