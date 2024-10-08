<script>
	export let texte;
	export let fonction = () => {};
</script>

<button type="submit" class="button" style="background-color: #053682; color:white" on:click={fonction}>{texte}</button>