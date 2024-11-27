<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import PartenaireAvantage from "$lib/components/boites/partenaireAvantage.svelte";

    export let data;
    const partenaires = data.partenaires;

    // Regrouper les partenaires par nom de catégorie
    const partenairesParCategorie = partenaires.reduce((acc, partenaire) => {
        const categorieNom = partenaire.categorie?.nom;
        if (categorieNom) {
            if (!acc[categorieNom]) {
                acc[categorieNom] = [];
            }
            acc[categorieNom].push(partenaire);
        }
        return acc;
    }, {});

    // Convertir l'objet en tableau pour l'itération
    const categories = Object.keys(partenairesParCategorie).map(nom => ({
        nom,
        partenaires: partenairesParCategorie[nom]
    }));

    // Mettre en évidence le lien actif dans menu latéral gestionnaire
    import { onMount } from "svelte";

    onMount(()=>{
        const actives = document.querySelectorAll('a.is-active');
        actives.forEach((x)=>x.classList.remove('is-active'));
        document.getElementById('mesAvantages').classList.add('is-active')
    });
</script>

<H1Title title={"Mes avantages"} />

<div>
    {#each categories as categorie}
        <div class="block">
            <H2Title title={categorie.nom} />
            <div class="fixed-grid is-col-min-10 has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop has-4-cols-widescreen has-4-cols-fullhd">
                <div class="grid">
                    {#each categorie.partenaires as partenaire}
                        <PartenaireAvantage
                            logo={`/${partenaire.logo}`}
                            nom={partenaire.nom}
                            avantage={partenaire.avantage}
                            code={partenaire.code}
                            expiration={partenaire.expiration}
                        ></PartenaireAvantage>
                    {/each}
                </div>
            </div>
        </div>
    {/each}
</div>

