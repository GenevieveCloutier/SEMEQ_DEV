<script>
	
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

	import MenuConnexion from "./menuConnexion.svelte";
	export let session;
	export let id;
	export let role;
	export let abonne;
	import { onMount } from "svelte";

	onMount(() => {
    const menu = document.getElementById('menuConnexion');

    if (menu) {
        document.addEventListener('click', cacherMenu)
	}
});

	//pour que le menu connexion se referme quand on clique sur un des liens
	function cacherMenu() { 
		console.log('allo') 
	let element = document.querySelector("#menuConnexion"); 
	element.style.display = 'none'; 
	setInterval(function () { element.style.display = ''; }, 50); 
	};

	
	</script>
	
	<div class="media mx-6 mt-5 ">
			<figure class="media-left">
				<a href="/">
					<img src="/img/app/logo.png" alt="logo SEMEQ" width="150" height="73" />
				</a>
			</figure>
		<div class="media-content is-align-self-flex-end is-hidden-mobile">
			<p class="is-size-6 pl-5 is-uppercase has-text-weight-bold">
				Le répertoire des salons, événements, marchés et expositions du Québec
			</p>
		</div>
		<div class="dropdown is-right is-hoverable" id='menuConnexion'>
			<button on:click={cacherMenu}>
				<div class="dropdown-trigger">		
						<span class="icon is-large">
						<i class="fa-solid fa-user fas fa-2x has-text-dark"></i>
						</span>
						<span class="icon is-small">
							<i class="fas fa-angle-down" aria-hidden="true"></i>
						</span>	
				</div>
			</button>
			<MenuConnexion session={session} role={role} id={id} abonne={abonne}/>
			
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

		.bordure{
			border:1px solid black;
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
	
	