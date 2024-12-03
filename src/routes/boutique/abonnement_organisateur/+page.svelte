<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import BoutonBleu from '$lib/components/boutons/boutonBleu.svelte';
    import SubmitButon from "$lib/components/formulaires/submitButon.svelte";
    import Retour from "$lib/components/generaux/retour.svelte";
    import AvantagesOrganisateur from "$lib/components/generaux/avantagesOrganisateur.svelte";
    import NotifDanger from '$lib/components/notifications/notifDanger.svelte';
    import abonEven from '$lib/data/abonEven.json'
    import { erreur } from '$lib/outils/formHandlers';

    export let data;
    const abonnementsEven = data.abonnementsEven;

//tranformer le fichier json en tableau pour la boucle each
  const tableauAbonnements = Object.entries(abonEven).map(([key, value]) => ({
    id: key,
    ...value,
      }));

let abonnementSelectionne = null;
let totalToSend;

// récupère l'identifiant du type d'abonnementsélectionné par l'utilisateur
    function abonnementChoisi(event) {
        const id = event.target.value; 
        abonnementSelectionne = tableauAbonnements.find((abonnement) => abonnement.id === id);
        totalToSend = abonnementSelectionne.prix;
        return {abonnementSelectionne, totalToSend}
    }


const envoyerDansURL = () => {
  // Créez l'URL avec le paramètre de requête
  const url = `/creation_compte/organisateur/?typeAbonnement=${encodeURIComponent(abonnementSelectionne.id)}`;
  
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

    <H1Title title={"Abonnement organisateur"} />

    <div class="columns">

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

    <form method="GET" action="?/typeAbonnement">
            <div class="field-body">
                <div class="field">
                  <label class="label" for="tiktok">Type d'abonnement souhaité<span class="rouge">*</span></label>
                    <div class="controle">
                        <div class="select">
                            <select id="selectionAbonnement" 
                                  on:change={abonnementChoisi} 
                                  name="typeAbonnement"
                                  required>
                                <option value="">SÉLECTIONNER</option>
                                    {#each tableauAbonnements as abonnement}
                                        <option value={abonnement.id}>{abonnement.nom}: {abonnement.prix.toFixed(2)}$</option>
                                    {/each}
                            </select>
                        </div>
                    </div><br>
                </div>
            </div>
            <SubmitButon texte={"Passer au paiement"} fonction={envoyerDansURL} />
            <Retour />
        </form>
        </div>
    </div>

</div>