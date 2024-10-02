<script>
	export let texte;
	export let lien;
	export let fonction = () => {};
</script>

<a href={lien}><button class="px-3 py-3" on:click={fonction}> {texte} </button></a>

<style>
	button {
		background-color: #d9d9d9;
		border-radius: 5px;
		color: black;
	}
</style>
