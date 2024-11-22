<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import PartenaireAvantage from "$lib/components/boites/partenaireAvantage.svelte";

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

    <H2Title title={"Décoration / Design / Accessoires"} />

    <div class="fixed-grid is-col-min-10 has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop has-4-cols-widescreen has-4-cols-fullhd">
        <div class="grid">
        {#each partenaires as partenaire}    
            <PartenaireAvantage logo={`/${partenaire.logo}`} nom={partenaire.nom} avantage={partenaire.avantage} code={partenaire.code} expiration={partenaire.expiration}></PartenaireAvantage>
        {/each}
        </div>
    </div>

</div>

<div class="block">

    <H2Title title={"Emballages / Packaging / Sacs"} />

    <div class="fixed-grid is-col-min-10 has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop has-4-cols-widescreen has-4-cols-fullhd">
        <div class="grid">
        {#each partenaires as partenaire}    
            <PartenaireAvantage logo={`/${partenaire.logo}`} nom={partenaire.nom} avantage={partenaire.avantage} code={partenaire.code} expiration={partenaire.expiration}></PartenaireAvantage>
        {/each}
        </div>
    </div>

</div>

<div class="block">

    <H2Title title={"Graphisme"} />

    <div class="fixed-grid is-col-min-10 has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop has-4-cols-widescreen has-4-cols-fullhd">
        <div class="grid">
        {#each partenaires as partenaire}    
            <PartenaireAvantage logo={`/${partenaire.logo}`} nom={partenaire.nom} avantage={partenaire.avantage} code={partenaire.code} expiration={partenaire.expiration}></PartenaireAvantage>
        {/each}
        </div>
    </div>

</div>

<div class="block">

    <H2Title title={"Impressions - Produits et services"} />

    <div class="fixed-grid is-col-min-10 has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop has-4-cols-widescreen has-4-cols-fullhd">
        <div class="grid">
        {#each partenaires as partenaire}    
            <PartenaireAvantage logo={`/${partenaire.logo}`} nom={partenaire.nom} avantage={partenaire.avantage} code={partenaire.code} expiration={partenaire.expiration}></PartenaireAvantage>
        {/each}
        </div>
    </div>

</div>

<div class="block">

    <H2Title title={"Maquillages"} />

    <div class="fixed-grid is-col-min-10 has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop has-4-cols-widescreen has-4-cols-fullhd">
        <div class="grid">
        {#each partenaires as partenaire}    
            <PartenaireAvantage logo={`/${partenaire.logo}`} nom={partenaire.nom} avantage={partenaire.avantage} code={partenaire.code} expiration={partenaire.expiration}></PartenaireAvantage>
        {/each}
        </div>
    </div>

</div>

<div class="block">

    <H2Title title={"Marketing web"} />

    <div class="fixed-grid is-col-min-10 has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop has-4-cols-widescreen has-4-cols-fullhd">
        <div class="grid">
        {#each partenaires as partenaire}    
            <PartenaireAvantage logo={`/${partenaire.logo}`} nom={partenaire.nom} avantage={partenaire.avantage} code={partenaire.code} expiration={partenaire.expiration}></PartenaireAvantage>
        {/each}
        </div>
    </div>

</div>

<div class="block">

    <H2Title title={"Présentoirs / Ébénisterie"} />

    <div class="fixed-grid is-col-min-10 has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop has-4-cols-widescreen has-4-cols-fullhd">
        <div class="grid">
        {#each partenaires as partenaire}    
            <PartenaireAvantage logo={`/${partenaire.logo}`} nom={partenaire.nom} avantage={partenaire.avantage} code={partenaire.code} expiration={partenaire.expiration}></PartenaireAvantage>
        {/each}
        </div>
    </div>

</div>

<div class="block">

    <H2Title title={"Vidéos et montage - Création de contenu"} />

    <div class="fixed-grid is-col-min-10 has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop has-4-cols-widescreen has-4-cols-fullhd">
        <div class="grid">
        {#each partenaires as partenaire}    
            <PartenaireAvantage logo={`/${partenaire.logo}`} nom={partenaire.nom} avantage={partenaire.avantage} code={partenaire.code} expiration={partenaire.expiration}></PartenaireAvantage>
        {/each}
        </div>
    </div>

</div>

