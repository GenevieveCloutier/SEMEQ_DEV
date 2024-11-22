<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";

    export let data;
    const partenaires = data.partenaires;

    // Mettre en évidence le lien actif dans menu latéral gestionnaire
    import { onMount } from "svelte";

    onMount(()=>{
        const actives = document.querySelectorAll('a.is-active');
        actives.forEach((x)=>x.classList.remove('is-active'));
        document.getElementById('mesAvantages').classList.add('is-active')
    });
</script>

<H1Title title={"Mes avantages"} />

<div class="block">

    <H2Title title={"Marketing web"} />

    <div class="fixed-grid is-col-min-10 has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop has-4-cols-widescreen has-4-cols-fullhd">
        <div class="grid">
        {#each partenaires as partenaire}    
            <div class="cell">
                <div class="card">
                    <div class="card-image">
                    <figure class="image is-1by1">
                            <img src="{`/${partenaire.logo}`}" alt="{partenaire.nom}"/>
                    </figure>
                    </div>
            
                    <div class="card-content">
                        <div class="content has-text-centered">
                            <div>{partenaire.avantage}</div>
                        </div>
                    </div>
            
                    <footer class="card-footer">
                        <div class="content has-text-centered">
                            Code promo : <b>{partenaire.code}</b><br>
                            {#if partenaire.expiration != "Aucune"}
                                Date d'expiration : <b>{partenaire.expiration}</b>
                            {:else}
                                Aucune date d'expiration
                            {/if}
                        </div>
                    </footer>
                </div>
            </div>
        {/each}
        </div>
    </div>

</div>

<style>
    .cell {
        display: flex;          /* Égaliser la hauteur des cell d'une même ligne */
        flex-direction: column; /* Égaliser la hauteur des cell d'une même ligne */
    }
    
    .card {
        height: 100%;           /* Égaliser la hauteur des card d'une même ligne */
        display: flex;          /* Égaliser la hauteur des card d'une même ligne */
        flex-direction: column; /* Égaliser la hauteur des card d'une même ligne */
    }

    .card-footer {
        margin-top: auto; /* Coller en bas de card */
        padding: 0.75rem;
        padding-top: 0rem;
        justify-content: center;
    }
</style>