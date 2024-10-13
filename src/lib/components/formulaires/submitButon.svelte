<script>
	export let texte;
	export let fonction = () => {};

	function chargement(event){
		event.target.classList.add('is-loading');
	}
</script>

<button type="submit" class="button" style="background-color: #053682; color:white" on:click={chargement}>{texte}</button>