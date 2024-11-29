<script>

import { onMount } from "svelte";
import AccordionMenu, { createAccordionContext, getAccordionContext } from "$lib/components/menus/accordionMenu.svelte";

//pour créer le contexte pour que les sections d'accordéon se referment quand on clique sur une autre
createAccordionContext();

  onMount(() => {
    const burger = document.querySelector('.navbar-burger');
    const menu = document.getElementById('navMenu');

    if (burger && menu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('is-active');
            menu.classList.toggle('is-active');
        });
	}
});

	
</script>

<hr class="mb-1 is-hidden-mobile is-hidden-tablet-only"/>
<nav data-sveltekit-reload class="navbar mx-6 navbar-bas block" role="navigation" aria-label="main navigation">

		<a
			id="burger"
			role="button"
			tabindex="0"
			class="navbar-burger"
			aria-label="menu"
			aria-expanded="false"
			data-target="navMenu">
		
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
		</a>
	<hr />
	<div id="navMenu" class="navbar-menu">
		<div class=" columns navbar-center">

			<div class="column titre">
				<AccordionMenu>
					<span class="mx-4 "slot="head">
						Répertoires
					</span>
					<span class="box" slot="details">
						<a class="navbar-item item-deroul" href="/visiteur">Événements de la semaine</a>
						<hr class="navbar-divider" />
						<a class="navbar-item item-deroul" href="/repertoire_exposants">Répertoire des exposants</a>
						<hr class="navbar-divider" />
						<a class="navbar-item item-deroul" href="/repertoire_evenements">Répertoire des événements</a>
					</span>
				</AccordionMenu>
			</div>

			<div class="column titre">
				<AccordionMenu>
					<span class="mx-4 "slot="head">
						<a href="/creation_compte"> Inscription </a>
					</span>
					<span class="box" slot="details">
						<a class="navbar-item item-deroul" href="creation_compte/compte_gratuit">Compte gratuit</a>
						<hr class="navbar-divider" />
						<a class="navbar-item item-deroul" href="/exposant#avantages">Compte exposant</a>
						<hr class="navbar-divider" />
						<a class="navbar-item item-deroul" href="/organisateur#avantages_organisateur">Compte organisateur</a>
					</span>
				</AccordionMenu>
			</div>


			<div class="column titre">
					<span class="mt-2">
						<a href="/boutique" class="navbar-item hover-bleu"> Formations et outils </a>
					</span>
			</div>

			<div class="column titre">
				<AccordionMenu>
					<span class="mx-4" slot="head">
						Contact
					</span>
					<span class="box" slot="details">
						<a class="navbar-item item-deroul" href="/contact">Nous joindre</a>
						<hr class="navbar-divider" />
						<a class="navbar-item item-deroul" href="/a_propos">À propos</a>
						<hr class="navbar-divider" />
						<a class="navbar-item item-deroul" href="/faq">F.A.Q.</a>
					</span>
				</AccordionMenu>
			</div>

			<div class="column titre ">
				<span class="mt-2">
					<a href="/blogue" class="navbar-item hover-bleu"> Blogue </a>
				</span>
		</div>

		</div>
	</div>
</nav>

<style>


	a {
		text-decoration: none;
		color: hsl(221deg, 14%, 29%)
	}

	.bordure{
		border:1px solid black;
	}
    
	.item-deroul:hover, .hover-bleu:hover {
		background-color: #184287;
		color: white;
	}

	
	.titre{
		display: flex;
		justify-content: center;
		width: 100%;
	}

	/* pour que le menu compte s'affiche par dessus la navbar */
	.navbar-bas {
		position: relative;
		z-index: 5;
	}
    
	/* pour étirer la navbar tout le long de la page sur pc:
     https://gist.github.com/ridgey28/ac007132125d6e251f6c1b96f04049ba */
	@media screen and (min-width: 1088px) 
	{
		.navbar-center {
			width: 100%;
  			position: absolute;
  			padding: 12px 16px;
  			z-index: 1;

		}
	
		.navbar-item {
			align-items: center;
			display: flex;
			flex-basis: auto;
			flex-grow: 0.2;
			flex-shrink: 0;
			justify-content: center;

		}
	}

</style>
