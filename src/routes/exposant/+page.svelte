<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
	import H2Title from "$lib/components/titres/h2Title.svelte";
    import BoutonGris from "$lib/components/boutons/boutonGris.svelte";
	import H3Title from "$lib/components/titres/h3Title.svelte";

</script>

<div class="container-fluid">
    <div class="block">
    <H1Title title={"Qui sommes-nous?"} />
    <div class="columns is-centered mt-4">
        <div class="column is-half-desktop">
            <p class="is-size-6 has-text-centered mb-3">Le Répertoire SÉMEQ est une ressource incontournable pour connaître et trouver tous les événements,
                marchés éphémères, expositions et salons d'artisans du Québec.</p>
        </div>
    </div>

    <div class="container ">
        <p id="infoExposant" class="mb-4">Trouve tous les événements à la recherche d'exposants en quelques clics!</p> 

        <!-- ce texte est à améliorer! -->
        <p>Abonne-toi à notre liste d'exposants officiels et reçois par courriel chaque mois, la liste des appels
            de candidatures pour les événements en cours! Sauve un temps fou et surtout tu éviteras de rater les appels
            de candidatures des événements qui t’intéressent!</p>
    </div>
</div>
    
    <div class="has-text-centered">
        <!-- pour sauter les avis sur mobile et aller direct au tableau -->
        <a class="is-hidden-desktop is-hidden-tablet-only mb-3" href="#avantages">Voir nos forfaits</a>
    </div>

    <div class="container">
    <H2Title title={"Ces exposants nous ont fait confiance!"} />
    </div>

    <div class="columns is-centered">
        <div class="column is-one-fifth-desktop">
            <div class="card is-equal-height">
                    <div class="media px-4 py-4">
                        <div class="media-left">
                            <figure class="is-hidden-tablet-only">
                                <img src="/src/lib/img/app/5_etoiles.svg" alt="Étoiles"/>
                            </figure>
                            <p class="title is-6">Les 1001 Mailles<br> de Miss Crochet</p>
                        </div>
                        <div class="media-content">
                            <figure class="image is-48x48">
                                <img class="is-rounded" src="/src/lib/img/app/avis/1000_maille_de_miss_crochet.jpg" alt="Logo de 1000 Mailles de Miss Crochet"/>
                            </figure>
                        </div>
                    </div>
                <div class="card-content">
                    <div class="content">
                        <p class="is-size-6">Ce répertoire est une mine d'or ! Il fait sauver du temps à toute personne désirant avoir un suivi sur les marchés à travers le Québec ! C'est un must !</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="column is-one-fifth-desktop">
            <div class="card is-equal-height">
                    <div class="media px-4 py-4">
                        <div class="media-left">
                            <figure class="is-hidden-tablet-only">
                                <img src="/src/lib/img/app/5_etoiles.svg" alt="Étoiles"/>
                            </figure>
                            <p class="title is-6">Miss ProjetSSS</p>
                        </div>
                        <div class="media-content">
                            <figure class="image is-48x48">
                                <img class="is-rounded" src="/src/lib/img/app/avis/miss_projetsss.jpg" alt="Logo de Miss ProjetSSS"/>
                            </figure>
                        </div>
                    </div>
                <div class="card-content">
                    <div class="content">
                        <p class="is-size-6">Bel  outil pour les artisans de regrouper tous les événements sous une bannière. </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="column is-one-fifth-desktop">
            <div class="card is-equal-height">
                    <div class="media px-4 py-4">
                        <div class="media-left">
                            <figure class="is-hidden-tablet-only">
                                <img src="/src/lib/img/app/5_etoiles.svg" alt="Étoiles"/>
                            </figure>
                            <p class="title is-6">Sage Pure</p>
                        </div>
                        <div class="media-content">
                            <figure class="image is-48x48">
                                <img class="is-rounded" src="/src/lib/img/app/avis/sage_pure.jpg"  alt="Logo de Sage Pure"/>
                            </figure>
                        </div>
                    </div>
                <div class="card-content">
                    <div class="content">
                        <p class="is-size-6">Nous venons tout juste de nous inscrire, j'adore le fait que tout est regroupé dans l'infolettre pour les candidatures et les trucs/conseils également. On adore!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="avantages" class="container">
    <H3Title title={"Notre offre pour les exposants:"} />


<div class="columns">
    <div class="column is-three-quarters-desktop">
        <div class="container">
            <table  class="table is-hoverable">
                <thead>
                    <tr >
                        <th class="has-text-centered">Accessible à tous<br><span class="is-size-7 has-text-grey">gratuit</span></th>
                        <th class="has-text-centered">Membres exposants seulement<br><span class="is-size-7 has-text-grey">49$/an</span></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td>Accès au calendrier des événements, classés par régions administratives et dates</td>
                    </tr>

                    <tr>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td>Autre avantage à déterminer</td>
                    </tr>

                    <tr>
                        <td class="has-text-centered"><span class="icon is-large has-text-danger"><i class="fa-solid fa-x fa-lg"></i></span></td>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td>Infolettre mensuelle contenant les appels de candidatures en cours. Ne les manque plus! Ils seront aussi disponibles en tout temps dans ton espace membres</td>
                    </tr>

                    <tr>
                        <td class="has-text-centered"><span class="icon is-large has-text-danger"><i class="fa-solid fa-x fa-lg"></i></span></td>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td>L’envoi de tes coordonnées aux organisateurs de marchés membres (si tu désires) pour qu’ils puisse t’inviter directement à leur marché</td>
                    </tr>

                    <tr>
                        <td class="has-text-centered"><span class="icon is-large has-text-danger"><i class="fa-solid fa-x fa-lg"></i></span></td>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td>Ton entreprise listée sur le répertoire des exposants (disponible pour les clients et les organisateurs de marchés), incluant le lien vers ton site web ou le  réseau social de ton choix</td>
                    </tr>

                    <tr>
                        <td class="has-text-centered"><span class="icon is-large has-text-danger"><i class="fa-solid fa-x fa-lg"></i></span></td>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td>Une fiche personalisée de ton entreprise, avec photos, coordonnées et description</td>
                    </tr>

                    <tr>
                        <td class="has-text-centered"><span class="icon is-large has-text-danger"><i class="fa-solid fa-x fa-lg"></i></span></td>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td>L’accès à un groupe privé Facebook où tu trouveras ressources et réseau d’entraide pour discuter avec d’autres exposants et artisans</td>
                    </tr>

                    <tr>
                        <td class="has-text-centered"><span class="icon is-large has-text-danger"><i class="fa-solid fa-x fa-lg"></i></span></td>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td>Des rabais et promotions exclusifs de nos partenaires offrant des produits et services pour vous <a href="/partenaires" target="blanck">(voir la liste ici)</a></td>
                    </tr>

                    <tr>
                        <td class="has-text-centered"><span class="icon is-large has-text-danger"><i class="fa-solid fa-x fa-lg"></i></span></td>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td>Ressources diverses, idées, videos, etc. Plusieurs petits plus te seront offerts dans ton espace membre(à venir)</td>
                    </tr>

                    <tr>
                        <td class="has-text-centered">Gratuit</td>
                        <td class="has-text-centered"><a href="/boutique"><BoutonGris texte={"Je m'inscris!"} /></a></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="column is-one-quarter">
        <div class="block bordure has-text-centered px-6 pb-5 is-hidden-tablet-only">
            <H3Title title={"Des questions?"} />
            <p class="pb-6">Visite notre <a href="/faq">F.A.Q.</a> qui sait, peut-être y trouveras-tu la réponse!</p>
            <p>Tu peux aussi nous contacter en remplissant <a href="/contact">ce formulaire</a>.</p>
        </div>
        <div class="block">
            <figure class=" image is-320x480 is-hidden-tablet-only">
                <img src="https://bulma.io/assets/images/placeholders/320x480.png" alt="photo de marche"/>
            </figure>
        </div>
    </div>
</div>   
</div>
</div>


<style>
    .fa-check{
        color:#184287;
    }

    .bordure {
		border: 1px solid #d9d9d9;
        border-radius: 10px;
	}

    .is-equal-height{
        display: flex;
        flex-direction: column;
        height: 100%
    }


</style>