<script>
	export let texte;
	export let lien;
	export let target;
	export let fichierNom;
	export let fonction = () => {};
</script>

<a href={lien} target={target} download={fichierNom}><button class="px-3 py-3" on:click={fonction}> {texte} </button></a>

<style>
	button {
		background-color: #184287;
		border-radius: 5px;
		color: white;
	}
</style>
