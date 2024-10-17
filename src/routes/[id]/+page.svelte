<script>
	import H1Title from "$lib/components/titres/h1Title.svelte";

    export let data;
    const user = data.user;
    
    import { onMount } from "svelte";

    onMount(()=>{
        const actives = document.querySelectorAll('a.is-active');
        actives.forEach((x)=>x.classList.remove('is-active'));
    document.getElementById('monCompte').classList.add('is-active')
    });
</script>

<H1Title title={"Mon compte"} />

<p class="has-text-centered">En construction!</p>

id_user : {user.id}<br>
{user.prenom} {user.nom}