<script>
      import H3Title from "$lib/components/titres/h3Title.svelte";
      import BoutonBleuHover from "$lib/components/boutons/boutonBleuHover.svelte";
</script>

<div class="container">
      <div class="media mx-6 mt-5">
            <figure class="media-left">
                  <a href="/">
                        <img src="/src/lib/img/app/logo.png" alt="logo SEMEQ" width="432" height="210" />
                  </a>
            </figure>
            <div class="media-content is-align-self-flex-end is-hidden-mobile">
                  <H3Title title={"Le répertoire des salons, événements, marchés et expositions au Québec"}/>
            </div>
      </div>
</div>

<div class="columns">
      <div class="column is one-third">
            <div class="card is-equal-height visiteur item">
                  <div class="card-content">
                        <figure>
                              <a href="/visiteur">
                                    <img src="/src/lib/img/app/accueil/titre_visiteur.png" alt="titre visiteur">
                              </a>
                        </figure>
                    <p class="is-size-4 has-text-white has-text-centered">
                      L'achat local et visiter des marchés te fait tripper?
                    </p>
                  </div>
                  <footer class="card-footer">
                    <p class="card-footer-item">
                      <span class="bouton">
                        <BoutonBleuHover texte={"Voir les prochains marchés"} lien={"/visiteur"} />
                      </span>
                    </p>
                  </footer>
            </div>
      </div>

      <div class="column is one-third">
            <div class="card is-equal-height exposant item">
                  <div class="card-content">
                        <figure>
                              <a href="/exposant">
                                    <img src="/src/lib/img/app/accueil/titre_expo.png" alt="titre exposant">
                              </a>
                        </figure>
                    <p class="is-size-4 has-text-white has-text-centered">
                      Tu aimerais vendre dans de nouveaux marchés mais tu ne sais pas par où commencer?
                    </p>
                  </div>
                  <footer class="card-footer">
                    <p class="card-footer-item">
                      <span class="bouton">
                        <BoutonBleuHover texte={"Découvre notre offre!"} lien={"/exposant"} />
                      </span>
                    </p>
                  </footer>
            </div>
      </div>

      <div class="column is one-third">
            <div class="card is-equal-height organisateur item">
                  <div class="card-content">
                        <figure>
                              <a href="/organisateur">
                                    <img src="/src/lib/img/app/accueil/titre_orga.png" alt="titre organisateur">
                              </a>
                        </figure>
                    <p class="is-size-4 has-text-white has-text-centered">
                      Tu organises des marchés et tu voudrais trouver facilement de nouveaux exposants?
                    </p>
                  </div>
                  <footer class="card-footer">
                    <p class="card-footer-item">
                      <span class="bouton">
                        <BoutonBleuHover texte={"Inscris ton marché au répertoire!"} lien={"/organisateur"} />
                      </span>
                    </p>
                  </footer>
            </div>
      </div>
</div>

<style>

.visiteur{
      background-image: url("/src/lib/img/app/accueil/visiteur.png");
      background-position: center;
      background-repeat: no-repeat; 
      background-size: cover; 
      margin: 1em;
}

.exposant{
      background-image: url("/src/lib/img/app/accueil/exposant.png");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover; 
      margin: 1em;
}

.organisateur{
      background-image: url("/src/lib/img/app/accueil/organisateur.png");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover; 
      margin: 1em;
}

.is-equal-height{
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 1em;

    }

    
    .item{
    display:flex;
    flex-direction:column;
    justify-content:space-between
  }

    .bouton{
        margin-top: auto;
        padding-bottom: 1em;
    }

</style>