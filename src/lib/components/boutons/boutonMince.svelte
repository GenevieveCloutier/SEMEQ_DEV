<script>
	export let texte;
	export let lien = "";

	export let fonction = () => {};
</script>

<a href={lien}><button class="px-2 py-2" on:click={fonction}> {texte} </button></a>

<style>
	button {
		width: 100%;
		background-color: #d9d9d9;
		border-radius: 5px;
		color: black;
        font-size: 0.9rem;
	}
</style>
