<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import SubmitButon from "$lib/components/formulaires/submitButon.svelte";
    import AbonnementEven from "$lib/components/boites/abonnementEven.svelte";
    import AbonnementExposant from "$lib/components/boites/abonnementExposant.svelte";
    import CheckboxResponsabilite from "$lib/components/formulaires/checkboxResponsabilite.svelte";
    import Retour from "$lib/components/generaux/retour.svelte";

    export let data;
	const {villes, users, session, role} = data;
</script>

<div class="container is-flex mt-6 mb-6">
    <div class="columns">
        <div class="column is-half">
            <AbonnementExposant />
        </div>
        <div class="column is-half">
            <AbonnementEven />
        </div>
    </div>
</div>



<H1Title title={"Créer mon compte gratuit"} />
<p class="has-text-centered">(Nécessaire pour inscrire un événement!)</p>
<form><!-- on:submit|preventDefault={nouveauCompteEven}> -->

<div class="block has-text-centered">
    <a href="/connexion" >Tu as déjà un compte? Connecte-toi pour bénéficier des tarifs avantageux pour les membres.</a>
</div>

<div class="container is-fluid">
    <div class="box">
        <div class="columns">
            <div class="column is-half">

                <div class="field">
                    <label class="label" for="nomBase">Nom <span class="rouge">*</span></label>
                    <div class="control">
                        <input class="input" type="text" name="nomBase" id="nomBase" placeholder="Nom" required />
                    </div>
                </div>

                <div class="field">
                    <label class="label" for="prenomBase">Prénom <span class="rouge">*</span></label>
                    <div class="control">
                        <input class="input" type="text" name="prenomBase" id="prenomBase" placeholder="prenom" required />
                    </div>
                </div>

                <div class="field">
                    <label class="label" for="villeBase">Ville</label>
                    <div class="control">
                        <div class="select is-fullwidth">
                                <select name="villeBase" id="villeBase" >
                                    <option value="" disabled selected>Choisir une ville</option>
                                    {#each villes as ville}
                                    <option value={ville.id}>{ville.nom} ({ville.region.nom})</option>
                                    {/each}
                                </select>
                            </div>
                        </div>
                    </div>

            </div>

            <div class="column is-half">

                <div class="field">
                    <label class="label" for="courrielBase">Courriel <span class="rouge">*</span></label>
                    <div class="control">
                        <input class="input" type="email" name="courrielBase" id="courrielBase" placeholder="nom@mail.com" required />
                    </div>
                </div>

                <div class="field">
                    <label class="label" for="MDPBase">Mot de passe <span class="rouge">*</span></label>
                    <div class="control">
                        <input class="input" type="password" name="MDPBase" id="MDPBase" placeholder="**************" required />
                    </div>
                </div>

            </div>
        </div>

        <hr class="is-hidden-mobile is-hidden-tablet-only" />
        <CheckboxResponsabilite />

    </div>

    <div class="block has-text-right">
        <SubmitButon texte={'Enregistrer'}></SubmitButon>
        <Retour />
    </div>

</div>
</form>