<script>
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import { domaines, recupMappage } from '$lib/outils/compteurBinaire';
    import mappageDomaines from "$lib/data/mappageDomaines.json";
    import Modal from "$lib/components/generaux/modal.svelte";
    import BoutonBleu from "$lib/components/boutons/boutonBleu.svelte"

    export let data;
    const { exposant } = data;

 
  let tableauDomaines=new Set();
  let domainesExposant = (recupMappage(exposant.domaine, domaines))
       for (let y = 0; y<domainesExposant.length; y++){
        domainesExposant[y] = mappageDomaines[domainesExposant[y]] || domainesExposant[y];
        tableauDomaines.add(domainesExposant[y])
       }

function siteweb(){
    let site =""
    if(exposant.site){
        site = exposant.site.split("//")[1];
        console.log(site)
        return site
    };
}

let affichersite = siteweb();

    
</script>

<div class="container is-fluid">
        <!-- pour donner une marge autour de la boite -->
        <div class="columns">
            <div class="column is-1"></div>
    
    <div class="box pb-6">
    <div class="columns is-vcentered">

        <div class="column is-1">
        {#if exposant.logo}
        <figure>
            <img src="/{exposant.logo}" alt="logo Repertoire SEMEQ">
        </figure>
        {/if}
    </div>
    <div class="column is-4">
        {#if exposant.entreprise}
            <H2Title title={exposant.entreprise} />
            {exposant.ville.nom}
        {:else}
            <H2Title title={exposant.prenom}-{exposant.nom} />
            {exposant.ville.nom}
        {/if}
    </div>
    <div class="column has-text-right">
        <BoutonBleu texte={"Retour au répertoire"} lien={"/repertoire_exposants"}/>
    </div>
    </div>
    <div class="columns mt-6 has-text-centered is-mobile">
        <div class="column is-hidden-mobile">
        </div>

        {#if exposant.photo_1}
        <div class="column is-flex centerImage is-mobile">
            <figure>
                <Modal image={`/${exposant.photo_1}`} />
            </figure>
        </div>
        {/if}

        {#if exposant.photo_2}
        <div class="column is-flex centerImage is-mobile">
            <figure>
                <Modal image={`/${exposant.photo_2}`} />
            </figure>
        </div>
        {/if}
        
        {#if exposant.photo_3}
        <div class="column is-flex centerImage is-mobile">
            <figure>
                <Modal image={`/${exposant.photo_3}`} />
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
        <div class="column px-5 py-5 bordure">

            <div class="columns">
                <!-- colone de gauche de l'encadré -->
                <div class="column">
                    {#if exposant.prenom && exposant.nom}
                    <strong>{exposant.prenom} {exposant.nom}</strong>
                    {:else}
                        <p>Aucun nom n'a été fourni</p>
                    {/if}

                    <ul class="ml-3 mb-3">
                        {#each tableauDomaines as domaine}
                        <li>-{domaine.nom}</li>
                        {/each}
                    </ul>


                    <div>
                        {#if exposant.telephone} 
                            <i class="fa-solid fa-phone"></i> {exposant.telephone} 
                        {/if}
                    </div>
 
                    <div>
                        {#if exposant.courriel}
                            <i class=" rose fa-regular fa-envelope"></i>
                            <a href= "mailto: {exposant.courriel}"> {exposant.courriel} </a>
                        {/if} 
                    </div>

                    <div>
                        {#if exposant.site}
                            <i class=" rose fa-solid fa-globe"> </i> <a href="{exposant.site}" target='blank'>{affichersite}</a>
                        {/if}
                    </div>
                    
                </div>

                <!-- colonne de droite de l'encadré -->
                <div class="column has-text-right">
                    <hr class="is-hidden-desktop">
                    <div class="mb-3">
                        {#if exposant.publique}
                            <p>Ouvert au public</p>
                        {/if}
                    </div>

                    {#if exposant.adresse && exposant.affichage}
                        {exposant.adresse}<br>
                        {exposant.ville.nom},
                        <span class="is-uppercase">{exposant.code_postal}</span>
                        
                    {:else}
                        {exposant.ville.nom}
                    {/if}

                    <div class="columns mt-4 is-mobile">
                        <div class="column"></div>
                        <div class="column is-flex centerImage is-mobile ">
                            {#if exposant.facebook}
                            <figure class="image is-24x24">
                                <a href={exposant.facebook} target="blank"><img src="/src/lib/img/app/facebook.svg" alt="logo facebook"></a>
                            </figure>
                            {/if}
                        </div>

                        <div class="column is-flex centerImage is-mobile  ">
                            {#if exposant.insta}
                            <figure class="image is-24x24">
                                <a href={exposant.insta} target="blank"><img src="/src/lib/img/app/insta.svg" alt="logo instagram"></a>
                            </figure>
                        {   /if}
                        </div>

                        <div class="column is-flex centerImage is-mobile ">
                            {#if exposant.tiktok}
                            <figure class="image is-24x24">
                                <a href={exposant.tiktok} target="blank"><img src="/src/lib/img/app/tiktok.svg" alt="logo tiktok"></a>
                            </figure>
                            {/if}
                        </div>

                    </div>
                </div>
            </div>
        </div>



        <!-- description à droite de l'encadré -->
        <div class="column ml-5">
            {#if exposant.description}
                {exposant.description}
            {:else}
                <p>Aucune description de l'entreprise n'a été fournie par l'exposant</p>
            {/if}
        </div>
        <div class="column is-1"></div>
    </div>
    </div>
    <div class="column is-1"></div>
</div>
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
    
.box{
    width: 100%;
}
    
</style>