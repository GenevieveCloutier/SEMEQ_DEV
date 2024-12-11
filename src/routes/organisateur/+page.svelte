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
            <p class="is-size-6 has-text-centered mb-3">Le Répertoire SÉMEQ est une ressource incontournable pour les <strong>organisateurs 
                de marchés et d'événements</strong> au Québec. <br><br>
                Grâce à nous, il est facile d’obtenir des candidatures d’exposants pour ton événement!<br>
            Pour en savoir plus sur l'équipe de Répertoire SEMEQ, <a href="/a_propos">clique ici!</a> </p>
        </div>
    </div>
</div>

<div class="container is-fluid">
    <div class="columns is-centered">
        <div class="column">
            <figure class="image is-5x4">
                <img src= "/img/app/vendeur.png" alt="Une vendeur tend un paquet à un client">
            </figure>
            <div class="box my-6 py-6 px-6 has-text-centered">
                <H3Title title={"Fais connaitre ton événement!"} />
            
                <p>Sans visiteur, un marché, c’est bien triste!</p><br>
                <p>Mets toutes les chances de ton côté et offre une vitrine supplémentaire à ton / tes événement(s) 
                    en l’inscrivant à notre répertoire destiné au grand public!</p><br>
            </div>
        </div>

        <div class="column">
            <figure class="image is-5x4">
                <img src= "/img/app/potiere.png" alt="Une personne fait de la poterie">
            </figure>
            <div class="box my-6 py-6 px-6 has-text-centered">
                <H3Title title={"Trouve de nouveaux exposants"} />
            
                <p>Les exposants sont le coeur de ton marché! Il est crucial de présenter des exposants qui correspondent 
                    à ce que les visiteurs de ton marché s’attendent à rencontrer!</p><br>

                <p>Plus tu reçois de candidatures, plus tu peux choisir les bons candidats pour ton événement!</p><br>
            </div>
        </div>

        <div class="column">
            <figure class="image is-5x4">
                <img src= "/img/app/marche.png" alt="Des personnes dans un marché">
            </figure>
            <div class="box my-6 py-6 px-6 has-text-centered">
                <H3Title title={"Les défis des organisateurs"} />      
            <p>Organiser un marché, c’est plus complexe qu’il n’y parait!</p><br>

            <p>L’appel de candidatures, le prix des kiosques, les visuels...</p><br>

            <p>Ouf! On peut t’aider à t’y retrouver avec nos outils, disponibles pour nos membres-abonnés!</p><br>
            </div>
        </div>
    </div>
</div>

    <div id="avantages" class="container">
        <hr class="my-6">
        <H3Title title={"Nos plans d'inscription - Événements"} />


<div class="columns">
    <div class="column is-three-quarters-desktop">
        <div class="container">
            <table  class="table is-hoverable">
                <thead>
                    <tr >
                        <th class="has-text-centered">Inscription gratuite<br><span class="is-size-7 has-text-grey">gratuit</span></th>
                        <th class="has-text-centered">Abonnement PRO<br><span class="is-size-7 has-text-grey">49$/an, jusqu'à <strong>3 </strong>événements</span></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td>Envoi de ton appel de candidature à nos membres exposants lorsqu’il sera en cours</td>
                    </tr>

                    <tr>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td>Affichage de ton événement dans notre répertoire accessible au grand public (événement gratuit: délai de 5 jours - événement abonné: affichage immédiat)</td>
                    </tr>

                    <tr>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td>Nom et dates  de l’événement</td>
                    </tr>

                    <tr>
                        <td class="has-text-centered"><span class="icon is-large has-text-danger"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td>Le lien vers ton site web ou un réseau social de ton choix</td>
                    </tr>

                    <tr>
                        <td class="has-text-centered"><span class="icon is-large has-text-danger"><i class="fa-solid fa-x fa-lg"></i></span></td>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td>Heures d’ouverture et adresse de l’événement</td>
                    </tr>

                    <tr>
                        <td class="has-text-centered"><span class="icon is-large has-text-danger"><i class="fa-solid fa-x fa-lg"></i></span></td>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td>Une fiche complète et détaillée de ton événement contenant photos et  description, pouvant ainsi attirer un plus grand nombre de candidatures et de visiteurs à ton événement.</td>
                    </tr>

                    <tr>
                        <td class="has-text-centered"><span class="icon is-large has-text-danger"><i class="fa-solid fa-x fa-lg"></i></span></td>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td>Affichage prioritaire et prolongé de ton événement sur la page d’accueil des visiteurs</td>
                    </tr>

                    <tr>
                        <td class="has-text-centered"><span class="icon is-large has-text-danger"><i class="fa-solid fa-x fa-lg"></i></span></td>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td>L’accès à un groupe privé Facebook où tu trouveras ressources et réseau d’entraide pour discuter avec d’autres organisateurs d’événement</td>
                    </tr>

                    <tr>
                        <td class="has-text-centered"><span class="icon is-large has-text-danger"><i class="fa-solid fa-x fa-lg"></i></span></td>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td>Des rabais et promotions exclusifs de nos partenaires offrant des produits et services pour vous <a href="/partenaires" target="blanck">(voir la liste ici)</a></td>
                    </tr>

                    <tr>
                        <td class="has-text-centered"><span class="icon is-large has-text-danger"><i class="fa-solid fa-x fa-lg"></i></span></td>
                        <td class="has-text-centered"><span class="icon is-large"><i class="fa-solid fa-check fa-lg"></i></span></td>
                        <td>Ressources diverses pour t’aider avec l”organisation de ton événement: “to-do”, documents variés (à venir)</td>
                    </tr>

                    <tr>
                        <td class="has-text-centered">Gratuit</td>
                        <td class="has-text-centered"><BoutonGris texte={"Je passe PRO!"} lien={"/boutique/abonnement_organisateur"} /></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="column is-one-quarter">
        <div class="block bordure has-text-centered px-6 py-5 is-hidden-tablet-only">
            <H3Title title={"Des questions?"} />
            <p class="pb-6">Visite notre <a href="/faq">F.A.Q.</a> qui sait, peut-être y trouveras-tu la réponse!</p>
            <p>Tu peux aussi nous contacter en remplissant <a href="/contact">ce formulaire</a>.</p>
        </div>
        <div class="block">
            <figure class=" image is-320-320 is-hidden-tablet-only">
                <img src="/img/app/accueil/image_accueil_organisateur.jpg" alt="kiosque en marche"/>
            </figure>
            <a class="is-size-7" href="https://la-vitrine-vaudreuil-soulanges.odoo.com/" target="blank">Crédit photo: La Vitrine Vaudreuil Soulanges</a>
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

    /* pour afficher les box de la même hauteur, mais seulement sur pc, sur mobile affiche les blocs un sous l'autre */
    @media screen and (min-width: 768px) {

        .columns {
        display: flex;
        align-items: stretch;
    }

        .column {
            display: flex;
            flex-direction: column;
        }

    .box {
        flex: 1;
    }
    }


</style>