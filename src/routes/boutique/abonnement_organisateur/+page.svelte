<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import BoutonBleu from '$lib/components/boutons/boutonBleu.svelte';
    import Retour from "$lib/components/generaux/retour.svelte";
    import AvantagesOrganisateur from "$lib/components/generaux/avantagesOrganisateur.svelte";

    export let data;
    const abonnementsEven = data.abonnementsEven;

    let premierAvecPhoto = abonnementsEven.find(organisateur => organisateur.photo !== null);
</script>

<div class="container is-fluid">

    <H1Title title={"Abonnement organisateur"} />

    <div class="columns">
        {#if premierAvecPhoto}
        <div class="column is-one-third">
            <figure class="image is-1by1 ">
                <img src="{premierAvecPhoto.photo}" alt="Photo {premierAvecPhoto.nom}" />
            </figure>
        </div>
        {/if}

        <div class="column">
            <p>
                L'abonnement organisateur permet d'avoir une fiche complète et détaillée pour chacun de tes événements contenant jusqu'à 
                3 photos de ton choix ainsi que les statistiques de ton événement, pouvant ainsi attirer un plus grand nombre de candidatures!<br>
                Tu peux en plus ajouter ??? événements gratuits par an avec dans le répertoire, mais ils n'auront pas de fiche et comprendront 
                moins détails. L'ajout des événements liés à ton abonnement n'a pas de délai d'approbation, contrairement à ceux inscrits 
                gratuitement.
            </p><br>

            <H2Title title={"Avantages :"} />
            <AvantagesOrganisateur /><br>

            <div class="field-body">
                <div class="field">
                    <div class="controle">
                        <div class="select">
                            <select id="selectionAbonnement">
                                {#each abonnementsEven as abonnement}
                                    <option value={abonnement.id}>{abonnement.desc} {abonnement.prix_v}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>
            </div><br>

            <BoutonBleu lien={'/panier'} texte={'Acheter'} /> <!-- fonction={ajouterPanier} -->
            <Retour />
        </div>
    </div>

</div>