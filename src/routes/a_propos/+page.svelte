<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H3Title from "$lib/components/titres/h3Title.svelte";
    import Accordion, { createAccordionContext, getAccordionContext } from "$lib/components/generaux/accordion.svelte";
    import associes from "$lib/data/associes.json"
    
//pour créer le contexte pour que les sections d'accordéon se referment quand on clique sur une autre
createAccordionContext();

</script>

<H1Title title={"À propos"} />

<div class="container is-fluid">
    <div class="container is-fluid">
        <p>En 2019, après 3 années de réflexion et de conceptualisation, Répertoire SÉMEQ voit le jour. En 2024, c’est avec 
            une immense fierté que nous prenons le relais dans cette aventure passionnante, avec la ferme intention de 
            perpétuer la vision des fondatrices et de consolider son statut d’incontournable pour les créateurs et 
            organisateurs.</p><br>

        <p>La vision initiale demeure inchangée : créer l’outil parfait, centralisant tous les services essentiels, 
            simplifiant ainsi la vie des créateurs et organisateurs d’événements.</p><br>
            
        <p>Les artisans exposants auront toujours accès mensuellement à des listes d’appels de candidatures qui leur 
            permet d’économiser du temps et de ne pas manquer les appels de candidatures. L’abonnement offre également un 
            accès sécurisé à des documents et formations facilitant la préparation aux événements, ainsi que des tarifs 
            préférentiels chez nos partenaires.</p><br>
            
        <p>Les organisateurs pourront rapidement consulter notre répertoire d’exposants pour constituer une banque de 
            candidats œuvrant dans divers domaines. Ils bénéficieront de conseils pour accroître leur attractivité auprès 
            des créateurs et pourront présenter de manière plus détaillée leur événement sur le site du répertoire.</p><br>
            
        <p>Notre engagement est de maintenir cette mission fondatrice tout en enrichissant l’expérience des membres, 
        faisant de Répertoire SÉMEQ un véritable atout pour la communauté créative. Répertoire SÉMEQ : une aventure qui 
        évolue avec enthousiasme, tout en demeurant fidèle à sa vision originale!</p><br>
    </div>
   
    <div class="container">
        <div class="has-text-centered mt-6">
            <H3Title title={"Notre équipe"} />
            <p>Clique sur les images pour découvrir nos parcours!</p>
        </div>
        <!-- les informations sont dans le fichier /data/associes.json -->
            {#each associes as associe}
            <Accordion>
                    <span slot="head">
                        <figure class="image is-128x128">{@html associe.img}</figure>
                        <p>{associe.nom}</p>
                    </span>
                    <div slot="details">
                    <p>
                        {@html associe.parcours}
                    </p>
                    </div>
            </Accordion>
            {/each} 
    </div> 

</div>