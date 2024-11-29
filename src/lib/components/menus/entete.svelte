<script>
import IconeConnexion from "./iconeConnexion.svelte";
export let session;
export let id;
export let role;


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
	
	<IconeConnexion id={id} session={session} role={role}  />
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

