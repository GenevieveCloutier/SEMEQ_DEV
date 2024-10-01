<script>
    import { creationExposant, erreur } from '../../../lib/outils/formHandlers';
  </script>
  
  
  <div class="block">
  
  <!-- Barre de progression, source : https://aramvisser.github.io/bulma-steps/ -->
  <ul class="steps is-narrow is-medium is-centered has-content-centered">
      <li class="steps-segment is-active">
          <span class="steps-marker">
            <span class="icon">
              <i class="fa fa-user"></i>
            </span>
          </span>
          <div class="steps-content">
            <p class="heading">INFORMATIONS</p>
          </div>
      </li>
  
      <li class="steps-segment">
          <span class="steps-marker">
            <span class="icon">
              <i class="fa fa-usd"></i>
            </span>
          </span>
          <div class="steps-content">
            <p class="heading">PAIEMENT</p>
          </div>
      </li>
  
      <li class="steps-segment">
          <span class="steps-marker">
            <span class="icon">
              <i class="fa fa-check"></i>
            </span>
          </span>
          <div class="steps-content">
            <p class="heading">CONFIRMATION</p>
          </div>
      </li>
  </ul>
  
  <div class="container has-text-centered">
    {#if $erreur}
    <div class="notification is-danger">
        <p>{$erreur}</p>
    </div>
    {/if}
  </div>
  
    <form on:submit|preventDefault={creationExposant}>
      <div class="box">
        <a href="/login" class="has-text-centered">Tu as déjà un compte? Connecte-toi pour bénéficier des tarifs avantageux pour les membres.</a>
  
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
              <label class="label" for="ville">Ville <span class="rouge">*</span></label>
              <div class="control">
                <input class="input" type="text" name="ville" id="ville" placeholder="Ville" >
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
                <input class="input" type="password" name="password" id="password" >
              </div>
            </div>
  
            <div class="field">
              <label class="label" for="prenom">Prénom <span class="rouge">*</span></label>
              <div class="control">
                <input class="input" type="text" name="prenom" id="prenom" placeholder="Prénom" >
              </div>
            </div>
  
            <div class="field">
              <label class="label" for="neq">
                Numéro d'entreprise du Québec (NEQ) <span class="rouge">*</span>
                <!-- Tooltip, source : https://wikiki.github.io/elements/tooltip/ -->
                <span class="icon is-small has-tooltip-top has-tooltip-bottom-desktop has-tooltip-left-tablet-only"
                  data-tooltip="Tu dois avoir un statut légal conforme au Québec et posséder un numéro d'entreprise du Québec (NEQ) si tu veux apparaître dans notre registre. Si ton prénom et nom de famille font partie de ton nom professionnel, merci de cocher la case 'Je n'ai pas de NEQ.'. Si tu n'as pas de NEQ ou de statut conforme, tu peux être membre quand même mais ton nom n'apparaîtra pas dans notre répertoire. Merci de ta compréhension.">
                  <i class="fas fa-info-circle"></i>
                </span>
              </label>
              <div class="control">
                <input class="input" type="text" name="neq" id="neq" placeholder="1012345678" pattern="^1\d{4}\d{5}$">
                <input class="checkbox exclus"  type="checkbox" id="no-neq"> Je n'ai pas de NEQ.
              </div>
            </div>
  
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
  
        <div class="field">
          <div class="control">
            <label class="label" for="domaine">Domaine(s) d'activité(s) <span class="rouge">*</span>
              <!-- Tooltip -->
              <span class="icon is-small has-tooltip-top has-tooltip-bottom-desktop has-tooltip-left-tablet-only"
                data-tooltip="Catégorie(s) dans laquelle ou lesquelles tu apparaitras sur notre site Web. La première catégorie est incluse, puis un ajout de 5$ par catégorie s'applique sur l'abonnement.">
                <i class="fas fa-info-circle"></i>
              </span>
            </label>
  
            <div class="columns">
              <!-- Première colonne -->
              <div class="column">
                <input class="checkbox" type="checkbox" name="accessoires_sacs" id="accessoires_sacs">Accessoires et sacs
                <input class="checkbox" type="checkbox" name="agro-alimentaire" id="agro-alimentaire">Agro-alimentaire
                <input class="checkbox" type="checkbox" name="animaux" id="animaux">Animaux
                <input class="checkbox" type="checkbox" name="arts_visuels" id="arts_visuels">Arts visuels
                <input class="checkbox" type="checkbox" name="bijoux_joaillerie" id="bijoux_joaillerie">Bijoux et/ou joaillerie
              </div>
      
              <!-- Deuxième colonne -->
              <div class="column">
                <input class="checkbox" type="checkbox" name="ceramique_poterie" id="ceramique_poterie">Céramique et poterie
                <input class="checkbox" type="checkbox" name="decoration_interieure" id="decoration_interieure">Décoration intérieure
                <input class="checkbox" type="checkbox" name="ebenisterie" id="ebenisterie">Ébénisterie et travail du bois
                <input class="checkbox" type="checkbox" name="forgerie" id="forgerie">Forgerie et travail des métaux
                <input class="checkbox" type="checkbox" name="jouets_loisirs" id="jouets_loisirs">Jouets, jeux et loisirs
              </div>
  
            <!-- Troisième colonne -->
            <div class="column">
              <input class="checkbox" type="checkbox" name="papeteries_livres" id="domaine">Papeteries et livres
              <input class="checkbox" type="checkbox" name="photographies" id="photographies">Photographies
              <input class="checkbox" type="checkbox" name="produits_corporels" id="produits_corporels">Produits corporels et/ou savons
              <input class="checkbox" type="checkbox" name="sculpture" id="sculpture">Sculpture
              <input class="checkbox" type="checkbox" name="tricots_crochets" id="tricots_crochets">Tricots et crochets
            </div>
  
            <!-- Quatrième colonne -->
            <div class="column">
              <input class="checkbox" type="checkbox" name="verre_vitrail" id="verre_vitrail">Verre et/ou vitrail
              <input class="checkbox" type="checkbox" name="vetements_tous" id="vetements_tous">Vêtements pour tous
              <input class="checkbox" type="checkbox" name="vetements_enfants" id="vetements_enfants">Vêtements pour enfants et bébés
              <input class="checkbox" type="checkbox" name="zero_dechet" id="zero_dechet">Zéro déchet
              <input class="checkbox" type="checkbox" name="autres" id="autres">Autres
            </div>
            
            </div>
  
          </div>
        </div>
  
        <div class="columns">
          <!-- Première colonne -->
          <div class="column">
            <label class="checkbox">
              Être affiché sur le site de Répertoire SÉMEQ dans l’onglet Répertoire exposants (nom + lien cliquable)?<br>
              <input type="checkbox" class="toggle exclus" >
            </label>
          </div>
  
          <!-- Deuxième colonne -->
          <div class="column">
            <label class="checkbox">
              Partager mon adresse courriel aux organisateurs d'événements (membres) pour recevoir leurs appels de candidatures?<br>
              <input type="checkbox" class="toggle exclus" name="partage">
            </label>
          </div>
        </div>
  
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" class="exclus" >
              Je comprends que Répertoire SÉMEQ n'est pas responsable du service donné par ses partenaires,
              je décharge donc de toute responsabilité le Répertoire SÉMEQ de tous mésententes et litiges pouvant éventuellement
              survenir à la suite d'une collaboration avec un de ses partenaires. <span class="rouge">*</span>
            </label>
          </div>
        </div>
  
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" class="exclus" >
              J'ai lu et j'accepte les <a href="#">conditions de vente de services</a>. <span class="rouge">*</span> <!-- AJOUTER LIEN -->
            </label>
          </div>
        </div>
  
      </div> <!-- Fin box -->
  
      <!-- Boutons en bas de page -->
      <div class="block has-text-right">
        <input type="submit" class="button is-link" value="Passer au paiement">
        
      </div>
    </form>
      
  </div>