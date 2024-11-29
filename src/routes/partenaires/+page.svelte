<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import H3Title from "$lib/components/titres/h3Title.svelte";
    import Accordion, { createAccordionContext } from "$lib/components/generaux/accordion.svelte";
    import PartenaireAvantage from "$lib/components/boites/partenaireAvantage.svelte";

    export let data;
    const partenaires = data.partenaires;

    //pour créer le contexte pour que les sections d'accordéon se referment quand on clique sur une autre
    createAccordionContext(); 

    // Regrouper les partenaires par nom de catégorie
    const partenairesParCategorie = partenaires.reduce((acc, partenaire) => {
        const categorieNom = partenaire.categorie?.nom;
        //ne pas afficher les catégories de Rabais boutique SÉMEQ

        if (categorieNom && partenaire.categorie_id != 1) {
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


</script>
<div class="columns">
    <div class="column is-1"></div>
    <div class="column">


<div class="container is-fluid">
    <H1Title title={"Partenaires"} />
 
    <div>
        <p>Voici la liste contenant les partenaires de Répertoire SÉMEQ. Ceux-ci constituent une liste de "bonnes adresses" 
            qui peut être utile à tous, artisans exposants ou encore aux organisateurs d'événements.</p><br>
        <p>Pour profiter des rabais exclusifs que nous offrent les partenaires, vous devez être membre de notre répertoire.
            Cela est peu coûteux et pourra vous faire économiser grâce à nos partenaires! </p>
    </div>


    <div class="columns">
        <div class="column mt-4">
            <H3Title title={"Catégories"} />
            {#each categories as categorie}
            <Accordion>
            
                <span slot="head" class="mx-4">
                    <H2Title title={categorie.nom} />
                </span>

                <span slot="details">
                    <div class="columns is-multiline has-text-centered ">
                        {#each categorie.partenaires as partenaire}
                            <div class="column is-one-quarter-desktop is-flex-tablet-only">
                                <div class=" card is-equal-height mx-2 is-flex ">
                                    <div class="card-content is-flex is-flex-direction-column is-align-items-center">
                                        <img class="image is-128x128 " src="/{partenaire.logo}" alt="logo du partenaire">
                                        <strong>{partenaire.nom}</strong><br>
                                        {partenaire.avantage}
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </span>
            </Accordion>
            {/each}
        </div>
    </div>
</div>
</div>
<div class="column is-1"></div>
</div>


<style>

.is-equal-height{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%
    }

img{
    object-fit: cover;
    width: 100%;
}


</style>