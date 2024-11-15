<script>
    import '$lib/css/styles.css';
    import '$lib/css/bulma-switch.css';
    import '$lib/css/bulma-tooltip.css';
    import '$lib/css/bulma-steps.css';
    import Navbar from '../lib/components/navbar.svelte';
	  import Footer from '../lib/components/footer.svelte';
	  import Entete from '../lib/components/entete.svelte';
	import Annonce from '../lib/components/notifications/annonce.svelte';

    export let data;
  const { id, role, session, cookiesAll } = data;
  
</script>

<Entete session={session} id={id} role={role}></Entete>
<Navbar />
<slot />
<Footer />
