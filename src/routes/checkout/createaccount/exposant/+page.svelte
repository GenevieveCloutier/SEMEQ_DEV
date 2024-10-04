<script>
  import Retour from "$lib/components/generaux/retour.svelte";
  import BarrePaiementEtape1 from "$lib/components/barre_progression_paiement/etape1.svelte";
  import Neq from "$lib/components/formulaires/neq.svelte";
  import CheckboxResponsabilite from "$lib/components/formulaires/checkboxResponsabilite.svelte";
  import CheckboxConditionsVente from "$lib/components/formulaires/checkboxConditionsVente.svelte";
  import SubmitButon from "$lib/components/formulaires/submitButon.svelte";
  import NotifDanger from "$lib/components/notifications/notifDanger.svelte";
  import DomainesActivites from "$lib/components/formulaires/domainesActivites.svelte";
  
  let erreur = null;

  /**
   * Gère la soumission du formulaire pour créer un nouvel élément.
   * @param {Event} event - L'événement de soumission du formulaire.
   * @returns {void}
   */
   async function handleSubmit(event) {
    const formData = new FormData(event.target);

    // Vérifier si le nombre de checkbox cochées est entre 1 et 3 pour Domaine(s) d'activit(é)s
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked:not(.exclus)');
    if (checkboxes.length < 1 || checkboxes.length > 3) {
      erreur = 'Merci de sélectionner entre 1 et 3 domaine(s) d\'activité(s) selon l\'abonnement choisi.';
      return;
    }

    // Choix obligatoire pour NEQ, l'utilisateur inscrit son NEQ ou coche la checkbox
    const neqInput = document.getElementById('neq');
    const noNeqCheckbox = document.getElementById('no-neq');

    if (!neqInput.value && !noNeqCheckbox.checked) {
      erreur = 'Merci de remplir le champ NEQ ou cocher la case "Je n\'ai pas de NEQ".';
      return;
    }

    const response = await fetch('?/newExposant', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    if (result.type == 'failure')
      erreur = JSON.parse(result.data)[0];
    else
      window.location.href = '/'; //AJOUTER LIEN
  }
</script>


<div class="block">

<BarrePaiementEtape1 />

<NotifDanger erreur={erreur}></NotifDanger>

  <form on:submit|preventDefault={handleSubmit}>
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
              <input class="input" type="text" name="ville" id="ville" placeholder="Ville" required>
            </div>
          </div>

          <div class="field">
            <label class="label" for="insta">Instagram</label>
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
              <input class="input" type="password" name="password" id="password" required>
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
            <label class="label" for="tiktok">TikTok</label>
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
          <label class="checkbox label" name="affichage" id="affichage">
            Être affiché sur le site de Répertoire SÉMEQ dans l’onglet Répertoire exposants (nom + lien cliquable)?<br>
            <input type="checkbox" class="toggle exclus">
          </label>
        </div>

        <!-- Deuxième colonne -->
        <div class="column">
          <label class="checkbox label" name="partage" id="partage">
            Partager mon adresse courriel aux organisateurs d'événements (membres) pour recevoir leurs appels de candidatures?<br>
            <input type="checkbox" class="toggle exclus">
          </label>
        </div>
      </div>

      <CheckboxResponsabilite />
      <CheckboxConditionsVente />

    </div> <!-- Fin box -->

    <!-- Boutons en bas de page -->
    <div class="block has-text-right">
      <SubmitButon texte={"Passer au paiement"}></SubmitButon>
      <Retour />
    </div>
  </form>
    
</div>