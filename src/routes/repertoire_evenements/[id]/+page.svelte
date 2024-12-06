<script>
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import H2AvecSousTitre from "$lib/components/titres/h2AvecSousTitre.svelte";
    import BoutonGris from "$lib/components/boutons/boutonGris.svelte";
    import AbonnemementExposant from "$lib/components/boites/abonnementExposant.svelte";
    import Modal from "$lib/components/generaux/modal.svelte";
    import { emplacements, types, verifs, recupMappage } from '$lib/outils/compteurBinaire';
    import mappageEmplacements from "$lib/data/mappageEmplacements.json";
    import mappageTypes from "$lib/data/mappageTypes.json";
    import mappageVerifications from "$lib/data/mappageVerifications.json";
	import BoutonBleu from "$lib/components/boutons/boutonBleu.svelte";

    export let data;
    const { evenement, role } = data;

// pour aller chercher le nom des emplacements (via le fichier json)
let tableauEmplacements=new Set();
let emplacementsEven = (recupMappage(evenement.emplacement, emplacements))
       for (let y = 0; y<emplacementsEven.length; y++){
        emplacementsEven[y] = mappageEmplacements[emplacementsEven[y]];
        tableauEmplacements.add(emplacementsEven[y])
       }

// pour aller chercher le nom des types(via le fichier json)
let tableauTypes=new Set();
let typesEven = (recupMappage(evenement.type, types))
       for (let z = 0; z<typesEven.length; z++){
        typesEven[z] = mappageTypes[typesEven[z]];
        tableauTypes.add(typesEven[z])
       }

// pour aller chercher le nom des vérifications(via le fichier json)
let tableauVerif=new Set();
let verifEven = (recupMappage(evenement.verification, verifs))
       for (let a = 0; a<verifEven.length; a++){
        verifEven[a] = mappageVerifications[verifEven[a]];
        tableauVerif.add(verifEven[a])
       }

function formaterDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short',  timeZone: 'UTC'} );
}

function formaterAnnee(dateStr){
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', timeZone: 'UTC'} );
}

//pour afficher le bouton Postuler seulement si les candidatures sont ouvertes
let debutCand = evenement.debut_cand.toLocaleDateString('fr-CA', {timeZone: 'UTC'});
let finCand = evenement.fin_cand.toLocaleDateString('fr-CA', {timeZone: 'UTC'});
let date=new Date();
date = date.toLocaleDateString('fr-CA', {timeZone: 'UTC'});

let postuler = false;
if ((debutCand < date) && (finCand > date)){
    postuler = true;
}

function siteweb(){
    let site =""
    if(evenement.site){
        site = evenement.site.split("//")[1];
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
        {#if evenement.utilisateur.logo && evenement.utilisateur.role_id == "2"}
        <figure>
            <img src="/{evenement.utilisateur.logo}" alt="logo de l'événement">
        </figure>
        {/if}
    </div>
    <div class="column is-4">
        {#if evenement.nom}
            <H2Title title={evenement.nom} />
            {evenement.ville.nom}
        {:else}
            <H2Title title={evenement.utilisateur.prenom}-{evenement.utilisateur.nom} />
            {evenement.ville.nom}
        {/if}
    </div>
    <div class="column has-text-right">
        <BoutonBleu texte={"Retour au répertoire"} lien={"/repertoire_evenements"}/>
    </div>
    </div>
    <div class="columns mt-6 has-text-centered is-mobile">
        <div class="column is-hidden-mobile ">
        </div>

        {#if evenement.photo_1}
        <div class="column is-flex centerImage is-mobile">
            <figure>
                <Modal image={`/${evenement.photo_1}`} />
            </figure>
        </div>
        {/if}

        {#if evenement.photo_2}
        <div class="column is-flex centerImage is-mobile">
            <figure>
                <Modal image={`/${evenement.photo_2}`} />
            </figure>
        </div>
        {/if}

        {#if evenement.photo_3}
        <div class="column is-flex centerImage is-mobile">
            <figure>
                <Modal image={`/${evenement.photo_3}`} />
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
                                <a href={evenement.fb_even} target="blank"><img src="/img/app/facebook.svg" alt="logo facebook"></a>
                            </figure>
                            {/if}
                        </div>

                        <div class="column is-mobile">
                            {#if evenement.insta_even}
                            <figure class="image is-24x24">
                                <a href={evenement.insta_even} target="blank"><img src="/img/app/insta.svg" alt="logo instagram"></a>
                            </figure>
                        {   /if}
                        </div>

                        <div class="column is-mobile">
                            {#if evenement.tiktok_even}
                            <figure class="image is-24x24">
                                <a href={evenement.tiktok_even} target="blank"><img src="/img/app/tiktok.svg" alt="logo tiktok"></a>
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
                <p>Aucune description de l'événement n'a été fournie par l'organisation.</p>
            {/if}
        </div>
        <div class="column is-1"></div>
    </div>

    {#if !role || role === "2" || role === "4" }
        <div class="columns">
            <div class="column is-1"></div>
            <div class="column id-10 bordure my-6 py-5 has-text-centered">
                    <H2AvecSousTitre title={"Informations supplémentaires réservées aux membres exposants"} subtitle={"Connecte-toi si tu es membre exposant!"}/>
                    <BoutonGris lien={"/connexion"} texte={"Me connecter"}/>

                    <div class="mt-6 mb-4">
                        <H2Title title="Tu es exposant(e) et aimerais être informé(e) des appels de candidatures des marchés?" />
                    </div>

                    <div class="columns">
                        <div class="column is-3"></div>
                        <div class="column">
                            <AbonnemementExposant />
                        </div>
                        <div class="column is-3"></div>
                    </div>

            </div>
            <div class="column is-1"></div>
        </div>
    {/if}


    {#if role === "1" || role === "3" }
    <div class="columns">
        <div class="column is-1"></div>
        <div class="column id-10 bordure my-6 py-5 has-text-centered">
                <H2AvecSousTitre title={"Informations supplémentaires exclusives!"} subtitle={"Ton abonnement membre te permet d'avoir accès à ces infos!"}/>
               
                <div class="columns">
                     <!-- colonne de gauche de l'encadré -->
                    <div class="column">
                        <H2Title title={"Statistiques de l'événement"} />
                        <div>
                            <span><span class="has-text-weight-bold">Année de fondation de l'événement: </span>
                                {#if evenement.fondation}
                                    {evenement.fondation}<br>
                                {:else}Inconnu <br>
                                {/if}
                            </span>

                            <span><span class="has-text-weight-bold">Nombre moyen de visiteurs: </span>
                                {#if evenement.nb_visiteur}
                                    {evenement.nb_visiteur}<br>
                                {:else}Inconnu <br>
                                {/if}
                            </span>

                            <span><span class="has-text-weight-bold">Nombre d'exposants: </span>
                                {#if evenement.nb_expo}
                                    {evenement.nb_expo}<br>
                                {:else}Inconnu <br>
                                {/if}
                            </span>
                        </div>     
                    </div>

                        <!-- colonne de droite de l'encadré -->
                       <div class="column">
                           <H2Title title={"Contact"} />
                           <div>
                               <span> <span class="has-text-weight-bold">Personne ressource: </span>
                                   {#if evenement.contact}
                                        {evenement.contact}<br>
                                   {:else}Inconnu <br>
                                   {/if}
                               </span>
   
                               <span><span class="has-text-weight-bold">Courriel de la personne ressource: </span>
                                   {#if evenement.courriel}
                                    <a href= "mailto: {evenement.courriel}"> {evenement.courriel} </a><br>
                                   {:else}Inconnu <br>
                                   {/if}
                               </span>

                               <span><span class="has-text-weight-bold"> Période de candidatures:</span>
                                {#if evenement.debut_cand && evenement.fin_cand}
                                Du {formaterDate(evenement.debut_cand)}
                                    au {formaterDate(evenement.fin_cand)}
                                    {formaterAnnee(evenement.fin_cand)}<br>
                                {:else}Inconnu <br>
                                {/if}
                            </span>

                               <span class="is-flex is-justify-content-center mt-4">
                                <!-- si la période de candidature est en cours (variable "postuler"), afficher le bouton -->
                                {#if postuler}
                                    {#if evenement.form_cand}   <!-- Formulaire appel de candidatures -->
                                    <a href="{evenement.form_cand}" target="_blank" class="button is-medium" style="background-color: #053682; color:white">Postuler</a>
                                    {:else if evenement.courriel}   <!-- Courriel pour information ou inscription -->
                                        <a href="mailto:{evenement.courriel}" class="button is-medium" style="background-color: #053682; color:white">Postuler</a>
                                    {:else if evenement.fb_even}    <!-- Événement Facebook -->
                                        <a href="{evenement.fb_even}" target="_blank" class="button is-medium" style="background-color: #053682; color:white">Postuler</a>
                                    {:else if evenement.site}   <!-- Site Web ou page Facebook événement -->
                                        <a href="{evenement.site}" target="_blank" class="button is-medium" style="background-color: #053682; color:white">Postuler</a>
                                    {:else}     <!-- Aucune information -->
                                        <p>Méthode inconnue pour postuler</p>
                                    {/if}
                                {/if}
                                </span>

                           </div>     
                       </div>
                </div>
            <hr>

                   <H2Title title={"Kiosques et sélection"} />
                   <div class="columns">
                    <div class=" column has-text-centered">
                        <span><span class="has-text-weight-bold">Emplacement des kiosques: </span>
                            {#if evenement.emplacement}
                            <ul>
                             {#each tableauEmplacements as emplacement}
                                 <li>{emplacement.nom}</li>
                             {/each}
                            </ul><br>

                            {:else}Inconnu <br>
                            {/if}
                        </div>

                        <div class=" column has-text-centered">
                            <span><span class="has-text-weight-bold">Type d'exposants rechechés </span>
                            {#if evenement.type}
                            <ul>
                             {#each tableauTypes as type}
                                 <li>{type.nom}</li>
                             {/each}
                             {#if evenement.type_autre}
                                <li>Autres: {evenement.type_autre}</li>
                            {/if}
                            </ul><br>
 
                            {:else}Inconnu <br>
                            {/if}
                        </div>
                            
                        <div class=" column has-text-centered">
                            <span><span class="has-text-weight-bold">Vérifications faites par l'organisation </span>
                            {#if evenement.verification}
                            <ul>
                             {#each tableauVerif as verif}
                                 <li>{verif.nom}</li>
                             {/each}
                             {#if evenement.verification_autre}
                                <li>Autres: {evenement.verification_autre}</li>
                            {/if}
                            </ul><br>
 
                            {:else}Inconnu / Aucune vérification <br>
                            {/if}
                        </span>
                    </div>
                </div>
                
                {#if evenement.selection}
                    <p>*** Une sélection est faite parmi les candidatures reçues</p>
                {:else}
                    <p>*** <strong>Aucune sélection</strong> n'est faite parmi les candidatures reçues</p>
                {/if}

                {#if evenement.limite}
                    <p>*** Le nombre d'exposants par catégorie est limité ***</p>
                {:else}
                    <p>***<strong> Aucune limite</strong> d'exposants par catégorie de produit ***</p>
                {/if}


                
                

        </div>
        <div class="column is-1"></div>

</div>
{/if}



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
