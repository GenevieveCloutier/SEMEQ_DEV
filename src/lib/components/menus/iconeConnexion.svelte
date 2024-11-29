<script>
export let session;
export let id;
export let role;

//pour faire fonctionner le menu de connexion au clic sur mobile, à valider

function clicIcone(){
      if (window.innerWidth <= 767) {
        let dropdown = document.querySelector('#dropdown-compte');
        dropdown.classList.toggle('is-active');
        dropdown.classList.remove("is-hoverable")
    }
      }

function cacherMenu() {  
    let element = document.querySelector("#dropdown-compte"); 
    element.style.display = 'none'; 
    setInterval(function () { element.style.display = ''; }, 50); 
    };

</script>
<button on:click={clicIcone}>
<div class="dropdown is-right is-hoverable">
    <div class="dropdown-trigger">		
            <span class="icon is-large">
            <i class="fa-solid fa-user fas fa-2x has-text-dark"></i>
            </span>
            <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>	
    </div>
    {#if session}
    <div class="dropdown-menu" id="dropdown-compte" role="menu" >
        <div class="dropdown-content">
             {#if id == 1}
            <a href={`/`} class="dropdown-item"> Mon compte </a>
            {:else}
            <a href={`/${id}`} class="dropdown-item"> Mon compte </a>
            {/if}
            <hr class="dropdown-divider" />
            <a href={`/${id}/mes_evenements`} class="dropdown-item" on:click={cacherMenu}> Mes événements </a>
            <hr class="dropdown-divider" />
            {#if role === '3' || role === '1'}
            <a href={`/${id}/appels_candidatures`} class="dropdown-item" on:click={cacherMenu}> Appels de candidature </a>
            <hr class="dropdown-divider" />
            {/if}
            <a href={`/${id}/mes_avantages`} class="dropdown-item" on:click={cacherMenu}> Mes avantages </a>
            <hr class="dropdown-divider" />
            <a href={`/${id}/formations_outils`} class="dropdown-item" on:click={cacherMenu}> Mes formations et outils </a>
            <hr class="dropdown-divider" />
            <a href={`/${id}/achats`} class="dropdown-item" on:click={cacherMenu}> Historique d'achat </a>
            <hr class="dropdown-divider" />
            <a href="/deconnexion" class="dropdown-item bouton-deconnexion" on:click={cacherMenu}> Déconnexion </a>
        </div>
    </div>
    {:else}
    <div class="dropdown-menu" id="dropdown-compte" role="menu">
        <div class="dropdown-content">
            <a href="/connexion" class="dropdown-item" on:click={cacherMenu}> Connexion </a>
        </div>
    </div>
    {/if}
</div>
</button>

<style>
    
	.fa-angle-down {
		color: #184287;
	}

	.dropdown-item:hover {
		background-color: #184287;
		color: white;
	}

	.bouton-deconnexion:hover {
		background-color: rgba(255, 0, 0, 0.599);
	}

</style>