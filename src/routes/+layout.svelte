<script>
    import '$lib/css/styles.css';
    import '$lib/css/bulma-switch.css';
    import '$lib/css/bulma-tooltip.css';
    import '$lib/css/bulma-steps.css';
    import { page } from '$app/stores';
    import Navbar from '$lib/components/menus/navbar.svelte';
	  import Footer from '$lib/components/menus/footer.svelte';
	  import Entete from '$lib/components/menus/entete.svelte';
	import Annonce from '$lib/components/notifications/annonce.svelte';

    export let data;
    const { id, role, session, cookiesAll, abonne } = data;

  //pour ne pas afficher le layout pour la page d'accueil
  $: accueil = $page.url.pathname === '/';
  // Pour ne pas afficher le layout pour les pages de factures
  $: facture = $page.url.pathname.startsWith(`/${id}/achats/`);
  
</script>

<!-- si la page affichée n'est pas la page d'accueil ou une page de facture, insérer les menus et le footer, sinon, mettre juste le slot-->
{#if !accueil && !facture}

  <Entete session={session} id={id} role={role} abonne={abonne}></Entete>
  <Navbar />
  <slot />
  <Footer />

  {:else}
  <slot />
{/if}


