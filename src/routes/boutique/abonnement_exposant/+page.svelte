<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import BoutonBleu from '$lib/components/boutons/boutonBleu.svelte';
    import Retour from "$lib/components/generaux/retour.svelte";
    import AvantagesExposant from "$lib/components/generaux/avantagesExposant.svelte";
    import NotifDanger from '$lib/components/notifications/notifDanger.svelte';
    import StorageAbonnements from "$lib/data/storageAbonnements.json";
    import { erreur } from '$lib/outils/formHandlers';

    export let data;
    const abonnementsExpo = data.abonnementsExpo;

    let premierAvecPhoto = abonnementsExpo.find(exposant => exposant.photo !== null);

//tranformer le fichier json en tableau pour la boucle each
    const tableauAbonnements = Object.entries(StorageAbonnements).map(([key, value]) => ({
        id: key,
        ...value,
        
      }));
//aller chercher seulement les abonnements de type exposant
    const affichageAbonnements = tableauAbonnements.filter(abonnement => abonnement.type === "exposant");

//enregistrer le choix de l'utilisateur dans localStorage
function abonnementChoisi(){
    let valeurRecuperee = document.querySelector("#selectionAbonnement").value;
  
    if (valeurRecuperee) {
        // Sauvegarde du typeAbonnement dans localStorage
        localStorage.setItem('typeAbonnement', valeurRecuperee); 
        console.log(valeurRecuperee)
    }
};

</script>

{#if $erreur}
    <div class="block">
        <NotifDanger></NotifDanger>
    </div>
{/if}

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

    <form>
      <div class="field-body">
        <div class="field">
          <label class="label" for="tiktok">Type d'abonnement souhaité<span class="rouge">*</span></label>
            <div class="controle">
                <div class="select">
                    <select id="selectionAbonnement" 
                          name="typeAbonnement"
                          required
                          on:change={abonnementChoisi}>
                            {#each affichageAbonnements as abonnement}
                                <option value={abonnement.id}>{abonnement.nom}: {abonnement.prix.toFixed(2)}$</option>
                            {/each}
                        </select>
                </div>
            </div>
        </div>
    </div><br>
    <BoutonBleu texte={"Passer au paiement"} lien={"/creation_compte/exposant"} fonction={abonnementChoisi}/>
            <Retour />
        </form>
        </div>
    </div>
</div>
