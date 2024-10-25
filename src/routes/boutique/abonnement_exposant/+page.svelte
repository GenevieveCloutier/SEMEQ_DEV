<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import BoutonBleu from '$lib/components/boutons/boutonBleu.svelte';
    import Retour from "$lib/components/generaux/retour.svelte";
    import AvantagesExposant from "$lib/components/generaux/avantagesExposant.svelte";

    export let data;
    const abonnementsExpo = data.abonnementsExpo;

    let premierAvecPhoto = abonnementsExpo.find(exposant => exposant.photo !== null);
</script>

<div class="container is-fluid">

    <H1Title title={"Abonnement exposant"} />

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
                L'abonnement exposant permet d'avoir la fiche de ton entreprise dans le répertoire des exposants (disponible pour 
                les clients et les organisateurs de marchés), incluant une catégorie correspondant au domaine d'activité.<br>
                Tu peux apparaître dans plusieurs catégories du répertoire en sélectionnant des catégories additionnelles au coût 
                de 5$ chacune, pour un maximum de 3 catégories/domaines d'activités.
            </p><br>

            <H2Title title={"Avantages :"} />
            <AvantagesExposant /><br>

            <div class="field-body">
                <div class="field">
                    <div class="controle">
                        <div class="select">
                            <select id="selectionAbonnement">
                                {#each abonnementsExpo as abonnement}
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