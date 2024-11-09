<script>

export let evenement
import BoutonMince from "$lib/components/boutons/boutonMince.svelte";

//pour afficher seulement le jour, le mois et l'année sur les vignettes d'événements
  function formaterDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' ,year:'numeric'});
    }


</script>

<div class=" card is-equal-height bordure mx-2">
    <div class="card-content">
        <p class="has-text-weight-bold">{evenement.nom}</p>
        <p class="mt-2"><strong>Dates:</strong></p>
        <p>Du: {formaterDate(evenement.debut_even)}</p>
        <p>Au: {formaterDate(evenement.fin_even)}</p>
        <p class="mt-2"><strong>Ville:</strong></p>
        <p>{evenement.ville.nom}</p>
        
        <!-- si l'utilisateur est abonné, afficher le bouton pour la fiche, sinon afficher l'icone -->
         {#if evenement.utilisateur.abonne}
            <div class="has-text-centered mt-2">
                <BoutonMince lien={'/repertoire_evenements/id'} texte={"Voir la fiche"} />
            </div>

        {:else if evenement.site}
        <figure class=" image is-32x32 mt-2 is-pulled-right">
            <a href="{evenement.site}" target="blank"><img src="/src/lib/img/app/site_web.svg" alt="site web de l'événement"></a>
        </figure>

        {:else if evenement.fb_even}
            <figure class=" image is-32x32 mt-2 is-pulled-right ">
                <a href="{evenement.fb_even}" target="blank"><img src="/src/lib/img/app/facebook.svg" alt="Page facebook de l'événement"></a>
            </figure>

        {:else if evenement.utilisateur.insta}
        <figure class=" image is-32x32 mt-2 is-pulled-right">
            <a href="{evenement.utilisateur.insta}" target="blank"><img src="/src/lib/img/app/insta.svg" alt="lien vers le compte instagram"></a>
        </figure>

        {:else if evenement.utilisateur.tiktok}
        <figure class=" image is-32x32 mt-2 is-pulled-right">
            <a href="{evenement.utilisateur.tiktok}" target="blank"><img src="/src/lib/img/app/tiktok.svg" alt="lien vers le compte tiktok"></a>
        </figure>

        {:else}
        <figure class=" image is-32x32 mt-2 is-pulled-right">
            <img src="/src/lib/img/app/non_disponible.svg" alt="Aucun lien disponible">
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