<script>

    export let exposant
    import BoutonMince from "$lib/components/boutons/boutonMince.svelte";
    import { domaines, recupMappage } from '$lib/outils/compteurBinaire';
    
    //pour afficher seulement le jour, le mois et l'année sur les vignettes d'événements
      function formaterDate(dateStr) {
            const date = new Date(dateStr);
            return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' ,year:'numeric'});
        }
    
    
    </script>
    
    <div class=" card is-equal-height bordure mx-2">
        <div class="card-content">
            {#if exposant.entreprise}
                <p class="has-text-weight-bold">{exposant.entreprise}</p>
            {:else}
                <p class="has-text-weight-bold">{exposant.prenom} {exposant.nom}</p>
            {/if}
            <p class="mt-3">{exposant.ville.nom}</p>

            <!-- enlever cette ligne après la démo -->
            <p>{recupMappage(exposant.domaine, domaines)}</p>
            
            <!-- si l'utilisateur a un abonnement actif, afficher le bouton pour la fiche, sinon afficher l'icone -->
             {#if exposant.abonne == 1}

                <div class="has-text-centered mt-2">
                    <BoutonMince lien={'/repertoire_exposants/id'} texte={"Voir la fiche"} />
                </div>
            
            {:else if exposant.site}
                <figure class=" image is-32x32 mt-2 is-pulled-right">
                    <a href="{exposant.site}" target="blank"><img src="/src/lib/img/app/site_web.svg" alt="site web de l'enterprise"></a>
                </figure>
    
            {:else if exposant.facebook}
                <figure class=" image is-32x32 mt-2 is-pulled-right ">
                    <a href="{exposant.facebook}" target="blank"><img src="/src/lib/img/app/facebook.svg" alt="Page facebook de l'enterprise"></a>
                </figure>
                     
            {:else if exposant.insta}
                <figure class=" image is-32x32 mt-2 is-pulled-right">
                    <a href="{exposant.insta}" target="blank"><img src="/src/lib/img/app/insta.svg" alt="instagram de l'enterprise"></a>
                </figure>

            {:else if exposant.tiktok}
                <figure class=" image is-32x32 mt-2 is-pulled-right">
                    <a href="{exposant.tiktok}" target="blank"><img src="/src/lib/img/app/tiktok.svg" alt="site web de l'enterprise"></a>
                </figure>
            {:else}
            <figure class=" image is-32x32 mt-2 is-pulled-right">
                <img src="/src/lib/img/app/non_disponible.svg" alt="aucun lien disponible">
            </figure>

            {/if}
        </div>
    </div>
    
    <style>
            .is-equal-height{
            display: flex;
            flex-direction: column;
            height: 100%
        }
    </style>