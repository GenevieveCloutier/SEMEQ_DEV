<script>
	import MenuConnexion from "./menuConnexion.svelte";

	export let session;
	export let id;
	export let role;
	export let abonne;


//pour faire fonctionner le menu de connexion au clic sur mobile, à valider
function clicIcone(){
      if (window.innerWidth <= 767) {
        let dropdown = document.querySelector('#dropdown-compte');
        dropdown.classList.toggle('is-active');
        dropdown.classList.remove("is-hoverable")
    }
      }

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
    <MenuConnexion session={session} role={role} id={id} abonne={abonne}/>
</div>
</button>

<style>
    
	.fa-angle-down {
		color: #184287;
	}


</style>