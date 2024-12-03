<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import SubmitButon from "$lib/components/formulaires/submitButon.svelte";
    import AbonnementEven from "$lib/components/boites/abonnementEven.svelte";
    import AbonnementExposant from "$lib/components/boites/abonnementExposant.svelte";
    import CheckboxResponsabilite from "$lib/components/formulaires/checkboxResponsabilite.svelte";
    import NotifDanger from "$lib/components/notifications/notifDanger.svelte"
    import Retour from "$lib/components/generaux/retour.svelte";
    import { creationVisiteur, erreur } from "$lib/outils/formHandlers";
    import StorageAbonnements from '$lib/data/storageAbonnements.json'
    import { onMount } from "svelte";


    export let data;
	const {villes, users, session, role} = data;

    //enregistrer que c'est un abonnement gratuit dans le localStorage
    onMount(async () => {

    //tranformer le fichier json en tableau pour aller chercher l'abonnement
    const tableauAbonnements = Object.entries(StorageAbonnements).map(([key, value]) => ({
        id: key,
        ...value,
        }));

    //aller chercher seulement les abonnements de type visiteur
    let affichageAbonnements = tableauAbonnements.filter(abonnement => abonnement.type === "visiteur");

    const compteVisiteur = affichageAbonnements[0].id;
  
    //sauvegarde du typeAbonnement dans localStorage
    localStorage.setItem('typeAbonnement', compteVisiteur); 
    console.log(compteVisiteur)
});

</script>

{#if $erreur}
    <NotifDanger></NotifDanger>
{/if}

<H1Title title={"Créer mon compte gratuit"} />
<p class="has-text-centered">(Nécessaire pour inscrire un événement!)</p>
<form on:submit|preventDefault={creationVisiteur}><!-- on:submit|preventDefault={nouveauCompteEven}> -->

<div class="block has-text-centered">
    <a href="/connexion" >Tu as déjà un compte? Connecte-toi pour bénéficier des tarifs avantageux pour les membres.</a>
</div>

<div class="container is-fluid">
    <div class="box">
        <div class="columns">
            <div class="column is-half">

                <div class="field">
                    <label class="label" for="nom">Nom <span class="rouge">*</span></label>
                    <div class="control">
                        <input class="input" type="text" name="nom" id="nomBase" placeholder="Nom" required />
                    </div>
                </div>

                <div class="field">
                    <label class="label" for="prenom">Prénom <span class="rouge">*</span></label>
                    <div class="control">
                        <input class="input" type="text" name="prenom" id="prenomBase" placeholder="prenom" required />
                    </div>
                </div>

                <div class="field">
                    <label class="label" for="ville_id">Ville</label>
                    <div class="control">
                        <div class="select is-fullwidth">
                                <select name="ville_id" id="villeBase" >
                                    <option value="" disabled selected>Choisir une ville</option>
                                    {#each villes as ville}
                                    <option value={ville.id}>{ville.nom} ({ville.region.nom})</option>
                                    {/each}
                                </select>
                            </div>
                        </div>
                    </div>

            </div>

            <div class="column is-half">

                <div class="field">
                    <label class="label" for="courriel">Courriel <span class="rouge">*</span></label>
                    <div class="control">
                        <input class="input" type="email" name="courriel" id="courrielBase" placeholder="nom@mail.com" required />
                    </div>
                </div>

                <div class="field">
                    <label class="label" for="pwd">Mot de passe <span class="rouge">*</span></label>
                    <div class="control">
                        <input class="input" type="password" name="pwd" id="MDPBase" placeholder="**************" required />
                    </div>
                </div>
            </div>
        </div>

        <hr class="is-hidden-mobile is-hidden-tablet-only" />
        <CheckboxResponsabilite />

    </div>

    <div class="block has-text-right">
        <SubmitButon texte={'Enregistrer'}></SubmitButon>
        <Retour />
    </div>

</div>
</form>

<div class="container is-flex my-5">
    <div class="columns">
        <div class="column is-half ">
            <AbonnementExposant />
        </div>
        <div class="column is-half">
            <AbonnementEven />
        </div>
    </div>
</div>