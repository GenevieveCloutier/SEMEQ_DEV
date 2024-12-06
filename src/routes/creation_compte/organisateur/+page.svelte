<script>
  import Retour from "$lib/components/generaux/retour.svelte";
  import BarrePaiementEtape1 from "$lib/components/barre_progression_paiement/etape1Organisateur.svelte";
  import Neq from "$lib/components/formulaires/neq.svelte";
  import CheckboxConditionsVente from "$lib/components/formulaires/checkboxConditionsVente.svelte";
  import SubmitButon from "$lib/components/formulaires/submitButon.svelte";
  import BoutonGris from "$lib/components/boutons/boutonGris.svelte"
  import NotifDanger from "$lib/components/notifications/notifDanger.svelte";

  import { creationOrganisateur, erreur } from '../../../lib/outils/formHandlers';
  export let data;
  const { villes, role } = data;

</script>


<div class="container is-fluid">

  <BarrePaiementEtape1 />
  <!-- le message s'Affiche mais on est quand même redirigé -->
  {#if $erreur}
    <NotifDanger />
  {/if}


  <!-- afficher le formulaire seulement si la personne n'a pas déjà un compte ou du moins n'est pas connectée... -->
  {#if !role || role == "1"}
  <form on:submit|preventDefault={creationOrganisateur}>
    <div class="box">
      <div class="block has-text-centered">
        Tu as déjà un compte? <a href="/login" >Connecte-toi </a> pour bénéficier des tarifs avantageux pour les membres.
      </div>

      <div class="columns">
        <!-- Première colonne -->
        <div class="column">

          <div class="field">
            <label class="label" for="courriel">Courriel <span class="rouge">*</span></label>
            <div class="control">
              <input class="input" type="email" name="courriel" id="courriel" placeholder="nom@mail.com" required>
            </div>
          </div>

          <div class="field">
            <label class="label" for="nom">Nom <span class="rouge">*</span></label>
            <div class="control">
              <input class="input" type="text" name="nom" id="nom" placeholder="Nom" required>
            </div>
          </div>

          <div class="field">
            <label class="label" for="entreprise">Entreprise <span class="rouge">*</span></label>
            <div class="control">
              <input class="input" type="text" name="entreprise" id="entreprise" placeholder="Nom de l'entreprise ou organisation" required>
            </div>
          </div>

          <div class="field">
            <label class="label" for="ville">Ville <span class="rouge">*</span></label>
            <div class="control">
              <div class="select is-fullwidth">
                <select name="ville_id" id="ville_id" >
                  <option value="" disabled selected>Choisir une ville</option>
                  {#each villes as ville}
                  <option value={ville.id}>{ville.nom} ({ville.region.nom})</option>
                  {/each}
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label" for="insta">Instagram</label>
            <div class="control">
              <input class="input" type="url" name="insta" id="insta" placeholder="https://www.instagram.com/entreprise">
            </div>
          </div>

          <div class="field">
            <label class="label" for="tiktok">TikTok</label>
            <div class="control">
              <input class="input" type="url" name="tiktok" id="tiktok" placeholder="https://www.tiktok.com/@entreprise">
            </div>
          </div>

        </div>

        <!-- Deuxième colonne -->
        <div class="column">

          <div class="field">
            <label class="label" for="password">Mot de passe <span class="rouge">*</span></label>
            <div class="control">
              <input class="input" type="password" name="pwd" id="pwd" required>
            </div>
          </div>

          <div class="field">
            <label class="label" for="prenom">Prénom <span class="rouge">*</span></label>
            <div class="control">
              <input class="input" type="text" name="prenom" id="prenom" placeholder="Prénom" required>
            </div>
          </div>

          <Neq />

          <div class="field">
            <label class="label" for="site">Site internet ou lien de ta page Facebook</label>
            <div class="control">
              <input class="input" type="url" name="site" id="site" placeholder="https://www.entreprise.com ou https://www.facebook.com/entreprise">
            </div>
          </div>

          <div class="field">
            <label class="label" for="logo">Logo</label>
            <div class="control">
              <input class="input" type="file" accept="image/png, image/jpeg, image/svg" name="logo" id="logo">
            </div>
          </div>
          
        </div>

      </div> <!-- Fin des colonnes -->

      <CheckboxConditionsVente />

    </div> <!-- Fin box -->

    <!-- champ caché pour preciser qu'il s'agit d'un compte abonné -->
    <!-- <input name="abonne" value="on" hidden> -->
    <!-- Boutons en bas de page -->
    <div class="block has-text-right">
      <SubmitButon texte={"Passer au paiement"} />
      <Retour />
    </div>
  </form>
  {:else}
      <div class="block has-text-centered">
        <p class="notification is-danger ">Oups! <br>
          Il semblerait que tu aies déjà un compte sur notre plateforme!<br>
        Si tu as déjà un compte gratuit, et que tu aimerais le changer pour un compte exposant ou un compte organisateur, 
        <a href="/contact">contacte-nous!</a><br><br>
      <BoutonGris texte={"Annuler"} lien={"/visiteur"}/></p>
      </div>
  {/if}

    
</div>