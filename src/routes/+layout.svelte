<script>
    import '$lib/css/styles.css';
    import '$lib/css/bulma-switch.css';
    import '$lib/css/bulma-tooltip.css';
    import '$lib/css/bulma-steps.css';
    import { page } from '$app/stores';
    import Navbar from '../lib/components/navbar.svelte';
	  import Footer from '../lib/components/footer.svelte';
	  import Entete from '../lib/components/entete.svelte';

    export let data;
  const { id, role, session, cookiesAll } = data;

  //pour ne pas afficher le layout pour la page d'accueil
  $: accueil = $page.url.pathname === '/';
  
</script>

<!-- si la page affichée n'est pas la page d'accueil, insérer les menus et le footer, sinon, mettre juste le slot-->
{#if !accueil}

  <Entete session={session} id={id} role={role}></Entete>
  <Navbar />
  <slot />
  <Footer />

  {:else}
  <slot />
{/if}


