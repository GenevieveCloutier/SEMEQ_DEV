<script>
    import '$lib/css/styles.css';
    import '$lib/css/bulma-switch.css';
    import '$lib/css/bulma-tooltip.css';
    import '$lib/css/bulma-steps.css';
    import Navbar from '../lib/components/navbar.svelte';
	import Footer from '../lib/components/footer.svelte';
	import Entete from '../lib/components/Entete.svelte';
</script>

<Entete />
<Navbar />
<slot />
<Footer />
