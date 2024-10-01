<script>
	import Navbar from '../lib/components/navbar.svelte';
	import Footer from '../lib/components/footer.svelte';
	import Entete from '../lib/components/Entete.svelte';
</script>

<Entete />
<Navbar />
<slot />
<Footer />
