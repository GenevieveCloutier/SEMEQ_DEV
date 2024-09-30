<script>
  import Retour from "$lib/components/retour.svelte";
  
  let erreur = null;

  /**
   * Gère la soumission du formulaire pour créer un nouvel élément.
   * @param {Event} event - L'événement de soumission du formulaire.
   * @returns {void}
   */
  async function handleSubmit(event)
  {
      const formData = new FormData(event.target);

      const response = await fetch('?/newOrganisateur', {
          method: 'POST',
          body: formData
      });
      const result = await response.json();
      if (result.type == 'failure')
          erreur = JSON.parse(result.data)[0];
      else
          window.location.href = '/'; //AJOUTER LIEN
  }

  // Choix obligatoire pour NEQ, l'utilisateur inscrit son NEQ ou coche la checkbox.
  const neqInput = document.getElementById('neq');
  const noNeqCheckbox = document.getElementById('no-neq');
  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    if (!neqInput.value && !noNeqCheckbox.checked) {
      event.preventDefault();
      alert('Veuillez remplir le champ NEQ ou cocher la case "Je n\'ai pas de NEQ".');
    }
  });
</script>


<div class="block">

<!-- Barre de progression, source : https://aramvisser.github.io/bulma-steps/ -->
<ul class="steps is-narrow is-medium is-centered has-content-centered">
    <li class="steps-segment">
        <a href="#" class="has-text-dark"> <!-- AJOUTER LIEN -->
            <span class="steps-marker">
              <span class="icon">
                <i class="fa fa-user"></i>
              </span>
            </span>
            <div class="steps-content">
              <p class="heading">INFORMATIONS</p>
            </div>
        </a>
    </li>
    <li class="steps-segment">
        <a href="#" class="has-text-dark"> <!-- AJOUTER LIEN -->
            <span class="steps-marker">
              <span class="icon">
                <i class="fa fa-usd"></i>
              </span>
            </span>
            <div class="steps-content">
              <p class="heading">PAIEMENT</p>
            </div>
        </a>
    </li>
    <li class="steps-segment">
        <a href="#" class="has-text-dark"> <!-- AJOUTER LIEN -->
            <span class="steps-marker">
              <span class="icon">
                <i class="fa fa-check"></i>
              </span>
            </span>
            <div class="steps-content">
              <p class="heading">CONFIRMATION</p>
            </div>
        </a>
    </li>
</ul>

<div class="container has-text-centered">
  {#if erreur}
  <div class="notification is-danger">
      <p>{erreur}</p>
  </div>
  {/if}
</div>

  <form on:submit|preventDefault={handleSubmit}>
    <div class="box">
      <a href="/login" class="has-text-centered">Tu as déjà un compte? Connecte-toi pour bénéficier des tarifs avantageux pour les membres.</a>

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

          <div class="field">
            <label class="label" for="neq">Numéro d'entreprise du Québec (NEQ) <span class="rouge">*</span></label>
            <div class="control">
              <input class="input" type="text" name="neq" id="neq" placeholder="1012345678" pattern="^1\d{4}\d{5}$">
              <input class="checkbox" type="checkbox" id="no-neq"> Je n'ai pas de NEQ.
            </div>
          </div>

          <div class="field">
            <label class="label" for="site">Site internet ou lien de votre page Facebook</label>
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

      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox" required>
            J'ai lu et j'accepte les <a href="#">conditions de vente de services</a>.<span class="rouge">*</span> <!-- AJOUTER LIEN -->
          </label>
        </div>
      </div>

    </div> <!-- Fin box -->

    <!-- Boutons en bas de page -->
    <div class="block has-text-right">
      <input type="submit" class="button is-link" value="Passer au paiement">
      <Retour />
    </div>
  </form>
    
</div>