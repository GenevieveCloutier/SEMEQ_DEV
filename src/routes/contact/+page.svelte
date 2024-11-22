<script>
    import { connexion, erreur } from '../../lib/outils/formHandlers';
    import H1Title from '$lib/components/titres/h1Title.svelte';
    import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
    import Retour from '$lib/components/generaux/retour.svelte';
	import Annonce from '../../lib/components/notifications/annonce.svelte';
    import NotifSuccess from '../../lib/components/notifications/notifSuccess.svelte';
    import NotifDanger from '../../lib/components/notifications/notifDanger.svelte';
    function contact(){}
    </script>

<!--! Faut revoir le system de notification ici, c'etait la premiere version avant les components -->

    <H1Title title={'Formulaire de contact'}></H1Title>
        <div class="columns is-centered">
            <div class="column is-4 ">
                <NotifSuccess />
                <NotifDanger />
                <div class="box is-3">
                    <form on:submit|preventDefault={contact}>
                        <div class="field">
						    <label class="label" for="nom">Nom</label>
						    <div class="control">
							    <input class="input" type="text" name="nom" placeholder="" required/>
						    </div>
					    </div>
                        <div class="field">
						    <label class="label" for="courriel">Courriel</label>
						    <div class="control">
							    <input class="input" type="text" name="courriel" placeholder="" required/>
						    </div>
					    </div>
                        <div class="field">
						    <label class="label" for="message">Message</label>
						    <div class="control">
							   <textarea name="message" class="textarea"></textarea>
						    </div>
					    </div>
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