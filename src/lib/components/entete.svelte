<script>
	// Pour faire afficher le menu dropdown quand on clique sur l'icone ou la flèche
	export function toggleNavbarMenu(node) {
		function toggle() {
			node.closest('.dropdown').classList.toggle('is-active');
		}
		node.addEventListener('click', toggle);
		return {
			destroy() {
				node.removeEventListener('click', toggle);
			}
		};
	}
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
	<div class="dropdown is-right">
		<div class="dropdown-trigger">
			<!-- svelte-ignore a11y-missing-attribute -->
			<a aria-haspopup="true" aria-controls="dropdown-compte" use:toggleNavbarMenu>
				<img width="30px" src="/src/lib/img/app/compte.svg" alt="Icone de compte" />
				<span class="icon is-small">
					<i class="fas fa-angle-down" aria-hidden="true"></i>
				</span>
			</a>
		</div>
		<div class="dropdown-menu" id="dropdown-compte" role="menu">
			<div class="dropdown-content">
				<a href="/#" class="dropdown-item"> Mon compte </a>
				<hr class="dropdown-divider" />
				<a href="/#" class="dropdown-item"> Mes événements </a>
				<hr class="dropdown-divider" />
				<a href="/#" class="dropdown-item"> Appels de candidature </a>
				<hr class="dropdown-divider" />
				<a href="/#" class="dropdown-item"> Mes avantages </a>
				<hr class="dropdown-divider" />
				<a href="/#" class="dropdown-item"> Mes formations et outils </a>
				<hr class="dropdown-divider" />
				<a href="/#" class="dropdown-item"> Histoirique d'achat </a>
				<hr class="dropdown-divider" />
				<a href="/#" class="dropdown-item bouton-deconnexion"> Déconnexion </a>
			</div>
		</div>
	</div>
	<img class="ml-4" width="30px" src="/src/lib/img/app/panier.png" alt="Icone de panier" />
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
