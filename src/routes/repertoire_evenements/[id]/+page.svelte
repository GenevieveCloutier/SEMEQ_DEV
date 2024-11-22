<script>
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import H2AvecSousTitre from "$lib/components/titres/h2AvecSousTitre.svelte";
    import BoutonGris from "$lib/components/boutons/BoutonGris.svelte";

    export let data;
    const { evenement, role } = data;

function formaterDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short',  timeZone: 'UTC'} );
}

function formaterAnnee(dateStr){
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', timeZone: 'UTC'} );
}

function siteweb(){
    let site =""
    if(evenement.site){
        site = evenement.site.split("//")[1];
        console.log(site)
        return site
    };
}

let affichersite = siteweb();

    
</script>

<div class="container is-fluid">
    <div class="columns is-vcentered">
        <div class="column is-1">
        </div>

        <div class="column is-1">
        {#if evenement.logo}
        <figure>
            <img src="/{evenement.logo}" alt="logo Repertoire SEMEQ">
        </figure>
        {/if}
    </div>
    <div class="column is-4">
        {#if evenement.entreprise}
            <H2Title title={evenement.entreprise} />
            {evenement.ville.nom}
        {:else}
            <H2Title title={evenement.prenom}-{evenement.nom} />
            {evenement.ville.nom}
        {/if}
    </div>
    </div>
    <div class="columns mt-6 has-text-centered is-mobile">
        <div class="column is-hidden-mobile ">
        </div>

        {#if evenement.photo_1}
        <div class="column is-flex centerImage is-mobile">
            <figure>
                <img class="imageCarre" src= "/{evenement.photo_1}" alt={evenement.entreprise}/>
            </figure>
        </div>
        {/if}

        {#if evenement.photo_2}
        <div class="column is-flex centerImage is-mobile">
            <figure>
                <img class="imageCarre" src= "/{evenement.photo_2}" alt={evenement.entreprise}/>
            </figure>
        </div>
        {/if}
        
        {#if evenement.photo_3}
        <div class="column is-flex centerImage is-mobile">
            <figure>
                <img class="imageCarre" src= "/{evenement.photo_3}" alt={evenement.entreprise}/>
            </figure>
        </div>
        {/if}
        
        <div class="column is-hidden-mobile">
        </div>
    </div>

    <div class="columns mt-6">
        <div class="column is-1">
        </div>

        <!-- encadré à gauche -->
        <div class="column px-5 py-5 bordure is-one-third">

            <div class="columns">
                <!-- colone de gauche de l'encadré -->
                <div class="column">

 
                    <div>
                        {#if evenement.courriel}
                            <i class=" rose fa-regular fa-envelope"></i>
                            <a href= "mailto: {evenement.courriel}"> {evenement.courriel} </a>
                        {/if} 
                    </div>

                    <div>
                        {#if evenement.site}
                            <i class=" rose fa-solid fa-globe"> </i> <a href="{evenement.site}" target='blank'>{affichersite}</a>
                        {/if}
                    </div>

                    <div class="columns mt-4 is-mobile">
                        <div class="column is-mobile">
                            {#if evenement.fb_even}
                            <figure class="image is-24x24">
                                <a href={evenement.fb_even} target="blank"><img src="/src/lib/img/app/facebook.svg" alt="logo facebook"></a>
                            </figure>
                            {/if}
                        </div>

                        <div class="column is-mobile">
                            {#if evenement.insta_even}
                            <figure class="image is-24x24">
                                <a href={evenement.insta_even} target="blank"><img src="/src/lib/img/app/insta.svg" alt="logo instagram"></a>
                            </figure>
                        {   /if}
                        </div>

                        <div class="column is-mobile">
                            {#if evenement.tiktok_even}
                            <figure class="image is-24x24">
                                <a href={evenement.tiktok_even} target="blank"><img src="/src/lib/img/app/tiktok.svg" alt="logo tiktok"></a>
                            </figure>
                            {/if}
                        </div>

                        <div class="column"></div>

                    </div>
                    
                </div>

                <!-- colonne de droite de l'encadré -->
                <div class="column has-text-right">
                    <hr class="is-hidden-desktop">
                    <div class="mb-3">
  
                    <div>
                        {#if evenement.adresse}
                        {evenement.adresse}<br>
                        {evenement.ville.nom},
                        <span class="is-uppercase">{evenement.code_postal}</span>
                        
                    {:else}
                        {evenement.ville.nom}
                    {/if}
                    </div>
  

                    <div class="mt-3 has-text-link-20">
                        {#if evenement.debut_even && evenement.fin_even}
                        <p>Du {formaterDate(evenement.debut_even)} 
                            au {formaterDate(evenement.fin_even)} 
                            {formaterAnnee(evenement.fin_even)}</p>
                        {/if}
                    </div>

                    <div class="mt-3 has-text-link-20">
                        {#if evenement.horaire_even}
                            <p>{evenement.horaire_even}</p>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>

        <!-- description à droite de l'encadré -->
        <div class="column ml-5">
            {#if evenement.description}
                {evenement.description}
            {:else}
                <p>Aucune description de l'entreprise n'a été fournie par l'exposant</p>
            {/if}
        </div>
    </div>

    {#if !role || role === "2" || role === "4" }
        <div class="columns">
            <div class="column is-1"></div>
            <div class="column id-10 bordure my-6 py-5 has-text-centered">
                    <H2AvecSousTitre title={"Informations supplémentaires réservées aux membres exposants"} subtitle={"Connecte-toi si tu es membre exposant!"}/>
                    <BoutonGris lien={"/connexion"} texte={"Me connecter"}/>
            </div>
            <div class="column is-1"></div>
        </div>
    {/if}


    {#if role === "1" || role === "3" }
    <div class="columns">
        <div class="column is-1"></div>
        <div class="column id-10 bordure my-6 py-5 has-text-centered">
                <H2AvecSousTitre title={"Informations supplémentaires exclusives!"} subtitle={"Ton abonnement membre te permet d'avoir accès à ces infos!"}/>
        </div>
        <div class="column is-1"></div>
    </div>
{/if}


 

</div>


<style>
    .bordure{
        border:1px solid lightgray;
        border-radius: 5px;
    }

    .centerImage{
        justify-content: center;
    }

    .imageCarre {
    width: 175px;
    aspect-ratio: 1/1;
    object-fit: cover;
}

    .rose{
        color: #c2108a;
    }

    
</style>
