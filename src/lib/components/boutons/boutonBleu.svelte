<script>
	export let texte;
	export let fonction = () => {};
</script>

<button class="px-3 py-3" on:click={fonction}> {texte} </button>

<style>
	button {
		background-color: #184287;
		border-radius: 5px;
		color: white;
	}
</style>
