<script>
	import Entete from '../lib/components/entete.svelte';
	import Navbar from '../lib/components/navbar.svelte';
	import Footer from '../lib/components/footer.svelte';
</script>

<Entete />
<Navbar />
<slot />
<Footer />
