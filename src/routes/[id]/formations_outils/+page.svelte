<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";

    import { onMount } from "svelte";

    onMount(()=>{
        const actives = document.querySelectorAll('a.is-active');
        actives.forEach((x)=>x.classList.remove('is-active'));
    document.getElementById('formationsOutils').classList.add('is-active')
    });
</script>

<H1Title title={"Mes formations et outils"} />

<p class="has-text-centered">En construction!</p>