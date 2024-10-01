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
	};

    // Pour faire afficher le menu dropdown quand on clique sur la flèche
    // Ne fonctionne pas :(
	export function toggleDropdownMenu(node) {
		function toggle() {
			node.closest('navbar').classList.toggle('is-active');
		}
		node.addEventListener('click', toggle);
		return {
			destroy() {
				node.removeEventListener('click', toggle);
			}
		};
	};
    
</script>

<hr class="mb-1 is-hidden-mobile is-hidden-tablet-only"/>
<nav class="navbar mx-6 navbar-bas" role="navigation" aria-label="main navigation">

        <!-- svelte-ignore a11y-missing-attribute -->
		<a
			role="button"
			class="navbar-burger"
			aria-label="menu"
			aria-expanded="false"
			data-target="navbar-general"
			use:toggleNavbarMenu
		>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
		</a>
	<hr />
	<div id="navbar-general" class="navbar-menu">
		<div class="navbar-center">
			<div class="navbar-item has-dropdown is-hoverable" use:toggleDropdownMenu>
				<a href="/#" class="navbar-link"> Répertoires </a>
				<div class="navbar-dropdown">
					<a href="/#" class="navbar-item item-deroul"> Exposants </a>
					<hr class="navbar-divider" />
					<a href="/#" class="navbar-item item-deroul"> Événements </a>
				</div>
			</div>

			<div class="navbar-item has-dropdown is-hoverable">
				<a href="/#" class="navbar-link"> Inscription </a>
				<div class="navbar-dropdown">
					<a href="/#" class="navbar-item item-deroul"> Exposants </a>
					<hr class="navbar-divider" />
					<a href="/#" class="navbar-item item-deroul"> Événements </a>
				</div>
			</div>

			<a href="/#" class="navbar-item"> Formations et outils </a>

			<div class="navbar-item has-dropdown is-hoverable">
				<a href="/#" class="navbar-link"> Contact </a>
				<hr class="navbar-divider" />
				<div class="navbar-dropdown">
					<a href="/#" class="navbar-item item-deroul"> Nous joindre </a>
					<hr class="navbar-divider" />
					<a href="/#" class="navbar-item item-deroul"> À propos </a>
				</div>
			</div>

			<a href="/#" class="navbar-item"> Blogue </a>

		</div>
	</div>
</nav>

<style>
	a {
		text-decoration: none;
	}
    
	.item-deroul:hover/*, .navbar-item:hover, .navbar-link:hover*/ {
		background-color: #184287;
		color: white;
	}

	.navbar-link::after {
		border-color: #184287;
	}

	.navbar-bas {
		position: relative;
		z-index: 5;
	}
    

	/* pour étirer la navbar tout le long de la page sur pc:
     https://gist.github.com/ridgey28/ac007132125d6e251f6c1b96f04049ba */
	@media screen and (min-width: 1088px) {
		.navbar-center {
			display: flex;
			justify-content: stretch;
			align-items: stretch;
			flex-grow: 1;
			flex-shrink: 0;
			flex-direction: row;
		}
		.navbar-link,
		.navbar-item {
			align-items: center;
			display: flex;
			flex-basis: auto;
			flex-grow: 0.2;
			flex-shrink: 0;
			justify-content: center;
		}
		.navbar-dropdown .navbar-item {
			justify-content: center;
		}
	}
</style>
