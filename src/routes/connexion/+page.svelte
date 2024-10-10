<script>
    import { connexion, erreur } from '../../lib/outils/formHandlers';
    import H1Title from '$lib/components/titres/h1Title.svelte';
    import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
    import Retour from '$lib/components/generaux/retour.svelte';
    </script>
    
    <H1Title title={'Connexion'}></H1Title>
        <div class="columns is-centered">
            <div class="column is-4 ">
                {#if $erreur}
                <div class="notification is-danger has-text-centered">
                    <p>{$erreur}</p>
                </div>
                {/if}
                <div class="box is-3">
                    <form on:submit|preventDefault={connexion}>
                        <div class="field">
						    <label class="label" for="courriel">Courriel</label>
						    <div class="control">
							    <input class="input" type="mail" name="courriel" id="courriel" placeholder="" />
						    </div>
					    </div>
                        <div class="field">
						    <label class="label" for="pwd">Mot de passe</label>
						    <div class="control">
							    <input class="input" type="password" name="pwd" id="pwd" placeholder="" />
						    </div>
					    </div>
                        <a href="#" class="help has-text-centered">J'ai oublié mon mot de passe</a>
                        <div class="block has-text-centered">
                            <div class="skeleton-block"></div>
                            <!-- Valider si SubmitButon fait la bonne action! -->
                            <SubmitButon texte={'Se connecter'}></SubmitButon>
                            <Retour />
                        </div>
                        <a href="/creation_compte" class="help has-text-centered">Tu n’as pas encore de compte? Clique ici.</a>
                    </form>
                </div>
            </div>
        </div>