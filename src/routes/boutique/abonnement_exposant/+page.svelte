<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import BoutonBleu from '$lib/components/boutons/boutonBleu.svelte';
    import SubmitButon from "$lib/components/formulaires/submitButon.svelte";
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
    let affichageAbonnements = tableauAbonnements.filter(abonnement => abonnement.type === "exposant");

   

  
    let abonnementSelectionne = null;
    //let totalToSend;

//     // récupère l'identifiant dy type d'abonnement sélectionné par l'utilisateur
//       function nbCategories(event) {
//       const id = event.target.value; 
//       abonnementSelectionne = tableauAbonnements.find((abonnement) => abonnement.id === id);
//       totalToSend = abonnementSelectionne.prix;
//       return {abonnementSelectionne, totalToSend}
//   }

  const envoyerDansURL = () => {
  // Créez l'URL avec le paramètre de requête
  const url = `/creation_compte/exposant/?typeAbonnement=${encodeURIComponent(abonnementSelectionne.id)}`;
  
  // Utilisez `window.location` pour rediriger vers cette URL
  window.location.href = url;
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

           <!-- sélection du nombre de catégories qui sera acheté -->
      <div class="field-body">
        <div class="field">
          <label class="label" for="tiktok">Type d'abonnement souhaité<span class="rouge">*</span></label>
            <div class="controle">
                <div class="select">
                    <select id="selectionAbonnement" 
                          name="typeAbonnement"
                          required>
                          <!-- on:change={nbCategories}  -->
                      <option value="">SÉLECTIONNER</option>
                        {#each affichageAbonnements as abonnement}
                            <option value={abonnement.id}>{abonnement.nom}: {abonnement.prix.toFixed(2)}$</option>
                        {/each}
                    </select>
                </div>
            </div>
        </div>
    </div><br>
    <SubmitButon texte={"Passer au paiement"} fonction={envoyerDansURL} />
            <Retour />
        </div>
    </div>

</div>