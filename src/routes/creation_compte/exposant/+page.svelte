<script>
    import Retour from "$lib/components/generaux/retour.svelte";
    import BarrePaiementEtape1 from "$lib/components/barre_progression_paiement/etape1.svelte";
    import Neq from "$lib/components/formulaires/neq.svelte";
    import CheckboxResponsabilite from "$lib/components/formulaires/checkboxResponsabilite.svelte";
    import CheckboxConditionsVente from "$lib/components/formulaires/checkboxConditionsVente.svelte";
    import SubmitButon from "$lib/components/formulaires/submitButon.svelte";
    import NotifDanger from "$lib/components/notifications/notifDanger.svelte";
    import DomainesActivites from "$lib/components/formulaires/domainesActivites.svelte";
    
    import { creationExposant, erreur } from '../../../lib/outils/formHandlers';
    export let data;
    const { villes } = data;
</script>
  
  
<div class="container is-fluid">

  <BarrePaiementEtape1 />

  {#if $erreur}
    <NotifDanger />
  {/if}

  <form on:submit|preventDefault={creationExposant}>
    <div class="box">
      <div class="block has-text-centered">
        <a href="/login" >Tu as déjà un compte? Connecte-toi pour bénéficier des tarifs avantageux pour les membres.</a>
      </div>

      <div class="columns">
        <!-- Première colonne -->
        <div class="column">

          <div class="field">
            <label class="label" for="courriel">Courriel <span class="rouge">*</span></label>
            <div class="control">
              <input class="input" type="email" name="courriel" id="courriel" placeholder="nom@mail.com" >
            </div>
          </div>

          <div class="field">
            <label class="label" for="nom">Nom <span class="rouge">*</span></label>
            <div class="control">
              <input class="input" type="text" name="nom" id="nom" placeholder="Nom" >
            </div>
          </div>

          <div class="field">
            <label class="label" for="entreprise">Entreprise <span class="rouge">*</span></label>
            <div class="control">
              <input class="input" type="text" name="entreprise" id="entreprise" placeholder="Nom de l'entreprise ou organisation" >
            </div>
          </div>

          <div class="field">
            <label class="label" for="adresse">Adresse</label>
            <div class="control">
              <input class="input" type="text" name="adresse" id="adresse" placeholder="Numéro et rue" >
            </div>
          </div>

          <div class="field">
            <label class="label" for="ville">Ville <span class="rouge">*</span></label>
            <div class="control">
              <div class="select is-fullwidth">
                <select name="ville_id" id="ville_id" required>
                  <option value="" disabled selected>Choisir une ville</option>
                  {#each villes as ville}
                  <option value={ville.id}>{ville.nom} ({ville.region.nom})</option>
                  {/each}
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label" for="code_postal">Code postal (format: J0A 1A0)<span class="rouge">*</span></label>
            <div class="control">
              <input class="input" type="text" name="code_postal" id="code_postal" required placeholder="J0A 1A0" >
            </div>
          </div>

          <div class="field">
            <label class="label" for="facebook">Page Facebook de l'entreprise</label>
            <div class="control">
              <input class="input" type="url" name="facebook" id="facebook" placeholder="https://www.facebook.com/entreprise">
            </div>
          </div>

          <div class="field">
            <label class="label" for="insta">Compte Instagram de l'entreprise</label>
            <div class="control">
              <input class="input" type="url" name="insta" id="insta" placeholder="https://www.instagram.com/entreprise">
            </div>
          </div>

        </div>

        <!-- Deuxième colonne -->
        <div class="column">

          <div class="field">
            <label class="label" for="password">Mot de passe <span class="rouge">*</span></label>
            <div class="control">
              <input class="input" type="password" name="pwd" id="pwd" >
            </div>
          </div>

          <div class="field">
            <label class="label" for="prenom">Prénom <span class="rouge">*</span></label>
            <div class="control">
              <input class="input" type="text" name="prenom" id="prenom" placeholder="Prénom" >
            </div>
          </div>

          <Neq />

          <div class="field">
            <label class="label" for="logo">Logo</label>
            <div class="control">
              <input class="input" type="file" accept="image/png, image/jpeg, image/svg" name="logo" id="logo">
            </div>
          </div>

          
          <div class="field">
            <label class="label" for="telephone">Numéro de téléphone (format: 123 456-7890)</label>
            <div class="control">
              <input class="input" type="tel" pattern={"[0-9]{3} [0-9]{3}-[0-9]{4}"} name="telephone" id="telephone" placeholder="123 456-7890">
            </div>
          </div>

          <div class="field">
            <label class="label" for="site">Site internet de l'entreprise</label>
            <div class="control">
              <input class="input" type="url" name="site" id="site" placeholder="https://www.entreprise.com">
            </div>
          </div>

          <div class="field">
            <label class="label" for="tiktok">Compte TikTok de l'entreprise</label>
            <div class="control">
              <input class="input" type="url" name="tiktok" id="tiktok" placeholder="https://www.tiktok.com/@entreprise">
            </div>
          </div>
          
        </div>

      </div> <!-- Fin des colonnes -->

      <DomainesActivites />

      <div class="columns">
        <!-- Première colonne -->
        <div class="column">
          <div class="field">
            <label class="label" for="photo_1">Photo 1 (le format carré est préférable)</label>
            <div class="control">
              <input class="input" type="file" accept="image/png, image/jpeg, image/svg" name="photo_1" id="photo_1">
            </div>
          </div>
        </div>

        <!-- Deuxième colonne -->
        <div class="column">
          <div class="field">
            <label class="label" for="photo_2">Photo 2 (le format carré est préférable)</label>
            <div class="control">
              <input class="input" type="file" accept="image/png, image/jpeg, image/svg" name="photo_2" id="photo_2">
            </div>
          </div>
        </div>

        <!-- Troisième colonne -->
        <div class="column">
          <div class="field">
            <label class="label" for="photo_3">Photo 3 (le format carré est préférable)</label>
            <div class="control">
              <input class="input" type="file" accept="image/png, image/jpeg, image/svg" name="photo_3" id="photo_3">
            </div>
          </div>
        </div>

      </div> <!-- Fin 3 colonnes -->

      <div class="field">
        <label class="label" for="description">Description</label>
        <div class="control">
          <textarea class="textarea" name="description" id="description" placeholder="Décris briévement ton entreprise"></textarea>
        </div>
      </div><br>

      <div class="columns">
        <!-- Première colonne -->
        <div class="column">
          <label class="checkbox">
            As-tu une boutique / atelier ouvert au public?<br>
            <input type="checkbox" class="toggle exclus" name="affichage" id="affichage" >
          </label>
  

        <div class="field">
          <label class="checkbox">
            Afficher l'adresse dans la fiche détaillée de l'exposant (fiche de l'entreprise)?<br>
            <input type="checkbox" class="toggle exclus" name="publique" id="publique" >
          </label>
        </div>

    </div>

        <!-- Deuxième colonne -->
        <div class="column">
          <label class="checkbox">
            Partager mon adresse courriel aux organisateurs d'événements (membres) pour recevoir leurs appels de candidatures?<br>
            <input type="checkbox" class="toggle exclus" name="partage" id="partage">
          </label>
        </div>
      </div>

      <CheckboxResponsabilite />
      <CheckboxConditionsVente />

    </div> <!-- Fin box -->
    <!-- champ caché pour preciser qu'il s'agit d'un compte abonné -->
     <input name="abonne" value="on" hidden>
    <!-- Boutons en bas de page -->
    <div class="block has-text-right">
      <SubmitButon texte={"Passer au paiement"}></SubmitButon>
      <Retour />
    </div>
  </form>
    
</div>