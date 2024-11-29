<script>
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import H3Title from "$lib/components/titres/h3Title.svelte";
    import EtapeFinale from "$lib/components/barre_progression_paiement/etapeFinale.svelte";
    import BoutonGris from "$lib/components/boutons/boutonGris.svelte";

    export let data;
    const utilisateur = data.utilisateur;
</script>

<EtapeFinale />

<div class="container is-max-desktop is-narrow box">
    
    <H2Title title={"Confirmation de paiement"} />

    <div class="block subtitle has-text-centered">
        <b>Merci {utilisateur.prenom}!</b>
    </div>

    <div class="block">
        <p>Nous te remerçions de ta commande sur Répertoire SÉMEQ, la plateforme dédiée à simplifier la vie des artisans
            et organisateurs d’événements du Québec. Nous sommes ravis de t’accompagner dans cette aventure!
        </p><br>
        <p>Tu peux dès maintenant accéder à tous tes avantages et tes achats directement depuis ton compte.</p><br>
        <p>Si tu as des questions, n’hésite pas à nous contacter en cliquant <a href="/contact">ici</a>.</p><br>
        <p>Profite bien de ton expérience!</p>
    </div>

    <div  class="block has-text-centered">
        <BoutonGris texte={"Consulter mon historique d'achats"} lien={`/${utilisateur.id}/achats`}></BoutonGris>
    </div>

</div>