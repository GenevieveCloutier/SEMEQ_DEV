<script>
    export let session;
	export let id;
	export let role;
	export let abonne;

    //pour que le menu connexion se referme quand on clique sur un des liens
    function cacherMenu() {  
        let element = document.querySelector("#dropdown-compte"); 
        element.style.display = 'none'; 
        setInterval(function () { element.style.display = ''; }, 50); 
        };
</script>

{#if session}
			<div class="dropdown-menu" id="dropdown-compte" role="menu" >
				<div class="dropdown-content">
					{#if id == 1}
					<a href={`/gestionnaire`} class="dropdown-item"> Tableau de bord </a>
					{:else}
					<a href={`/${id}`} class="dropdown-item"> Mon compte</a>
					{/if}
					<hr class="dropdown-divider" />
					<a href={`/${id}/mes_evenements`} class="dropdown-item" on:click={cacherMenu}> Mes événements </a>
					<hr class="dropdown-divider" />
					{#if role === '3' && abonne === true || role === '1'}
					<a href={`/${id}/appels_candidatures`} class="dropdown-item" on:click={cacherMenu}> Appels de candidature </a>
					<hr class="dropdown-divider" />
					{/if}
					{#if abonne === true || role === '1'}
					<a href={`/${id}/mes_avantages`} class="dropdown-item" on:click={cacherMenu}> Mes avantages </a>
					<hr class="dropdown-divider" />
					{/if}
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

	<style>
	.dropdown-item:hover {
		background-color: #184287;
		color: white;
	}

	.bouton-deconnexion:hover {
		background-color: rgba(255, 0, 0, 0.599);
	}
	</style>