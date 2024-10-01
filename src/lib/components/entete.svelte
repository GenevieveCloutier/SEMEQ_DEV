
<script>
    //pour faire afficher le menu avec un appareil mobile quand on appuie sur le hamburger
    export function toggleNavbarMenu(node) {
        function toggle() {
            const target = node.getAttribute('data-target');
            const targetElement = document.getElementById(target);
            node.classList.toggle('is-active');
            if (targetElement) {
                targetElement.classList.toggle('is-active');
            }
        }

        node.addEventListener('click', toggle);

        return {
            destroy() {
                node.removeEventListener('click', toggle);
            }
        };
    }
</script>

<div class="mx-6 mt-3">
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
		<figure class="media-left">
			<a href="/">
				<img src="src/lib/img/app/logo.png" alt="logo SEMEQ" width="150" height="73" />
			</a>
		</figure>
		<div class="media-content is-align-self-flex-end is-hidden-mobile">
			<p class="is-size-6 pl-5 is-uppercase has-text-weight-bold">
				Le répertoire des salons, événements, marchés et expositions du Québec
			</p>
		</div>
			<a
				href="/#"
				role="button"
				class="navbar-burger"
				aria-label="menu"
				aria-expanded="false"
				data-target="navbar-compte"
				use:toggleNavbarMenu
			>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
		</div>

		<hr class="is-hidden-mobile is-hidden-tablet-only">
		<div id="navbar-compte" class="navbar-menu">
			<div class="navbar-end">
				<a href="/#" class="navbar-item">
					<img src="/src/lib/img/app/panier.png" alt="icone panier utilisateur" />
				</a>
				<div class="navbar-item has-dropdown is-hoverable">
					<a href="/#" class="navbar-link">
						<img src="/src/lib/img/app/compte.svg" alt="icone compte utilisateur" />
					</a>
					<div class="navbar-dropdown is-right">
						<a href="/#" class="navbar-item item-deroul"> Mon compte </a>
						<hr class="navbar-divider" />
						<a href="/#" class="navbar-item item-deroul"> Mes événements </a>
						<hr class="navbar-divider" />
						<a href="/#" class="navbar-item item-deroul"> Appels de candidature </a>
						<hr class="navbar-divider" />
						<a href="/#" class="navbar-item item-deroul"> Mes avantages </a>
						<hr class="navbar-divider" />
						<a href="/#" class="navbar-item item-deroul"> Mes formations et outils </a>
						<hr class="navbar-divider" />
						<a href="/#" class="navbar-item item-deroul"> Historique d'achat </a>
						<hr class="navbar-divider" />
						<a href="/#" class="navbar-item item-deroul bouton-deconnexion"> Déconnexion </a>
					</div>
				</div>
			</div>
		</div>
	</nav>
</div>

<style>
	a {
		text-decoration: none;
	}

	p {
		color: #184287;
	}

	.navbar-item.item-deroul:hover {
		background-color: #184287;
		color: white;
	}

	.navbar-link::after {
		border-color: #184287;
	}

	.navbar-item.bouton-deconnexion {
		background-color: #d9d9d9;
		color: black;
	}

	.navbar-item.bouton-deconnexion:hover {
		background-color: rgba(255, 0, 0, 0.599);
	}

	.navbar-menu {
		position: relative;
		z-index: 10;
	}

	.navbar-dropdown {
		position: absolute;
		z-index: 20;
		background-color: white;
	}
</style>
