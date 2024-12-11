<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
	import { onMount } from "svelte";
    export let data;
    const { blogue } = data;
    onMount(()=>{
        document.getElementById('article').innerHTML = blogue.article;
    });
</script>

<div class="section">
    <div class="columns">
        <div class="column is-3">
            <div><br><br><br></div>
            <figure class="image is-256x256 block">
                <img class="block" src="{blogue.image_1}" alt="image_1" />
            </figure>
            {#if blogue.image_2}
            <figure class="image is-256x256 block">
                <img class="block" src="{blogue.image_2}" alt="image_2" />
            </figure>
            {/if}
        </div>
        <div class="column">
            <div class="block">
                <h1 class="title is-size-4 is-uppercase" style="color: #184287;">{blogue.titre}</h1>
                <p class="help">{blogue.createdAt.toLocaleDateString('fr-CA')}</p>
               <div class="article" id="article"></div>
            </div>
        </div>
    </div>
</div>

<style>
    .article { white-space: pre-wrap; }
</style>

