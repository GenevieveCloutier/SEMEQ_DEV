<script>
	export let texte;
	export let lien;
	export let type;
	export let fonction = () => {};
</script>

<a href={lien}><button class="px-3 py-3" type={type} on:click={fonction}> {texte} </button></a>

<style>
	button {
		background-color: #184287;
		border-radius: 5px;
		color: white;
	}
</style>
