<script>
    import { connexion, erreur } from '../../lib/outils/formHandlers';
    import H1Title from '$lib/components/titres/h1Title.svelte';
    import Turnstile from '$lib/components/turnstile.svelte';
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
							    <input class="input" type="mail" name="courriel" id="courriel" placeholder="" required/>
						    </div>
					    </div>
                        <div class="field">
						    <label class="label" for="pwd">Mot de passe</label>
						    <div class="control">
							    <input class="input" type="password" name="pwd" id="pwd" placeholder="" required/>
						    </div>
					    </div>
                        <a href="/connexion/recuperation" class="help has-text-centered">J'ai oublié mon mot de passe</a>
                        <div class="block has-text-centered">
                            <!-- Captcha cloudflare turnstile -->
                            <Turnstile siteKey="{import.meta.env.VITE_TURNSTILE_SITE_KEY}" />
                            <!-- Valider si SubmitButon fait la bonne action! -->
                            <SubmitButon texte={'Se connecter'}></SubmitButon>
                            <Retour />
                        </div>
                        <a href="/creation_compte" class="help has-text-centered">Tu n’as pas encore de compte? Clique ici.</a>
                    </form>
                </div>
            </div>
        </div>


        <div
  class="cf-turnstile"
  data-sitekey="yourSitekey"
  data-callback="javascriptCallback"
></div>