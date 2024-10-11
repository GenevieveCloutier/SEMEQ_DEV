<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import BoutonGris from "$lib/components/boutons/boutonGris.svelte";
</script>

<H1Title title={"Boutique"} />

<p class="has-text-centered">En construction!<br>

<BoutonGris lien={"/creation_compte/exposant"} texte={"Acheter un abonnement exposant"}/>
<BoutonGris lien={"/creation_compte/organisateur"}  texte={"Acheter un abonnement événement"}/>

</p>