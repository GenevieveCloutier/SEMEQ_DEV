<script>

export let session;
export let id;
export let role;
export let abonne;

	// Pour faire afficher le menu dropdown quand on clique sur l'icone ou la flèche
	// export function toggleNavbarMenu(node) {
	// 	function toggle() {
	// 		node.closest('.dropdown').classList.toggle('is-active');
	// 	}
	// 	node.addEventListener('click', toggle);
	// 	return {
	// 		destroy() {
	// 			node.removeEventListener('click', toggle);
	// 		}
	// 	};
	// };

//pour que le menu connexion se referme quand on clique sur un des liens
	function cacherMenu() {  
		let element = document.querySelector("#dropdown-compte"); 
		element.style.display = 'none'; 
		setInterval(function () { element.style.display = ''; }, 50); 
		};

</script>

<div class="media mx-6 mt-5">
	<figure class="media-left">
		<a href="/">
			<img src="/src/lib/img/app/logo.png" alt="logo SEMEQ" width="150" height="73" />
		</a>
	</figure>
	<div class="media-content is-align-self-flex-end is-hidden-mobile">
		<p class="is-size-6 pl-5 is-uppercase has-text-weight-bold">
			Le répertoire des salons, événements, marchés et expositions du Québec
		</p>
	</div>
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
				<a href={`/gestionnaire`} class="dropdown-item"> Mon compte </a>
				{:else}
				<a href={`/${id}`} class="dropdown-item"> Mon compte </a>
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
	</div>
	<a href="/panier">
	<span class="icon is-large">
		<i class="ml-5 fa-solid fa-cart-shopping fas fa-2x has-text-dark"></i>
	</span>
	</a>
</div>

<style>

	p {
		color: #184287;
	}

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

	

	/*pour afficher le drop down plein écran sur mobile - marche pas*/
	/* @media screen and (min-width: 768px) {
    .dropdown {
        position: static !important;
    }

    .dropdown-trigger, .dropdown-menu {
        margin-top: 0px !important;
        width: 100% !important;
    }
}  */
</style>

