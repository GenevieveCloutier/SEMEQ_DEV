<script>

import { onMount } from "svelte";

  onMount(() => {
    const burger = document.querySelector('.navbar-burger');
    const menu = document.getElementById('navMenu');
	let element = document.getElementsByClassName("has-dropdown");


    burger.addEventListener('click', () => {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
	  element.classList.toggle('is-active');

	  console.log("ici")
	  console.log(element.classList)
    });
  });

	//pour que le dropdown se referme quand on clique sur un des liens
	function cacherMenu() {

		//pour que ça referme sur mobile
		let element = document.getElementsByClassName("has-dropdown"); 
		let burger = document.querySelector('#burger');
		let menu = document.querySelector('#navMenu')
		burger.classList.toggle('is-active');
		menu.classList.toggle('is-active')

		//pour que ça referme sur pc
		for(let x=0; x<element.length; x++){
			element[x].style.display = 'none'; 
			setInterval(function () { element[x].style.display = ''; }, 50); 
		};
	};

	// //pour fermer les dropdown sur mobile
	// function fermerDropdown(){
	// 	let element = document.getElementsByClassName("has-dropdown");
	// 	console.log(element.classList)

	// }
	
    
</script>

<hr class="mb-1 is-hidden-mobile is-hidden-tablet-only"/>
<nav class="navbar mx-6 navbar-bas" role="navigation" aria-label="main navigation">

        <!-- svelte-ignore a11y-missing-attribute -->
		<a
			id="burger"
			role="button"
			class="navbar-burger"
			aria-label="menu"
			aria-expanded="false"
			data-target="navMenu">
			<!-- use:toggleNavbarMenu> -->
		
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
		</a>
	<hr />
	<div id="navMenu" class="navbar-menu">
		<div class="navbar-center">
			<div class="navbar-item has-dropdown is-hoverable"> <!-- use:toggleDropdownMenu -->
				<span class="navbar-link"> Répertoires </span>
				<div class="navbar-dropdown">
					<a href="/repertoire_exposants" class="navbar-item item-deroul" on:click={cacherMenu}> Exposants </a>
					<hr class="navbar-divider" />
					<a href="/repertoire_evenements" class="navbar-item item-deroul" on:click={cacherMenu}> Événements </a>
				</div>
			</div>

			<div class="navbar-item has-dropdown is-hoverable">
				<span class="navbar-link"> Inscription </span>
				<div class="navbar-dropdown">
					<a href="/panier/creation_compte_exposant" class="navbar-item item-deroul" on:click={cacherMenu}> Exposants </a>
					<hr class="navbar-divider" />
					<a href="/panier/creation_compte_organisateur" class="navbar-item item-deroul" on:click={cacherMenu}> Événements </a>
				</div>
			</div>

			<a href="/boutique" class="navbar-item hover-bleu" on:click={cacherMenu}> Formations et outils </a>

			<div class="navbar-item has-dropdown is-hoverable">
				<span class="navbar-link"> Contact </span>
				<hr class="navbar-divider" />
				<div class="navbar-dropdown">
					<a href="/contact" class="navbar-item item-deroul" on:click={cacherMenu}> Nous joindre </a>
					<hr class="navbar-divider" />
					<a href="/a_propos" class="navbar-item item-deroul" on:click={cacherMenu}> À propos </a>
				</div>
			</div>

			<a href="/blogue" class="navbar-item hover-bleu" on:click={cacherMenu}> Blogue </a>

		</div>
	</div>
</nav>

<style>


	a {
		text-decoration: none;
	}
    
	.item-deroul:hover, .hover-bleu:hover {
		background-color: #184287;
		color: white;
	}

	.navbar-link::after {
		border-color: #184287;
	}

	/* pour que le menu compte s'affiche par dessus la navbar */
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
