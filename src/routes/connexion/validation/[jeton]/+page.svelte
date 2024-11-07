<script>
    import {changementMotDePasse, erreur} from "$lib/outils/formHandlers";
    import H1Title from '$lib/components/titres/h1Title.svelte';
    import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
    import Retour from '$lib/components/generaux/retour.svelte';

    export let data;
    const { utilisateur } = data;
    // console.log("front utilisateur = ", utilisateur);
    
</script>

{#if $erreur}
    <NontifDanger />
{/if}

<H1Title title={'Modifie ton mot de passe'}></H1Title>
        <div class="columns is-centered">
            <div class="column is-4 ">
                <div class="box is-3">
                    <form on:submit|preventDefault={changementMotDePasse}>
                        <div class="field">
						    <label class="label" for="nouveau_pwd">Nouveau mot de passe</label>
						    <div class="control">
							    <input class="input" type="password" name="nouveau_pwd" id="nouveau_pwd" placeholder="" />
						    </div>
					    </div>
                        <input name="utilisateur_id" value="{utilisateur.id}" readonly hidden>
                        <div class="block has-text-centered">
                            <!-- Valider si SubmitButon fait la bonne action! -->
                            <SubmitButon texte={'Envoyer'}></SubmitButon>
                            <Retour />
                        </div>
                    </form>
                </div>
            </div>
        </div>