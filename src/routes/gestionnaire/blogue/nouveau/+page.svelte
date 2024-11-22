<script>
	import H1Title from '$lib/components/titres/h1Title.svelte';
    import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
    import Retour from '$lib/components/generaux/retour.svelte';
	import NotifDanger from '../../../../lib/components/notifications/notifDanger.svelte';
	import NotifSuccess from '../../../../lib/components/notifications/notifSuccess.svelte';
	import { creationBillet } from '../../../../lib/outils/formHandlers';
</script>

<H1Title title={"Ajout d'un nouveau billet de blog"} />
<NotifDanger />
<NotifSuccess />
<form on:submit|preventDefault={creationBillet}>
	<div class="section">
		<div class="box">
			<div class="field">
				<label class="label" for="titre">Titre de l'article</label>
				<div class="control">
					<input
						class="input"
						type="text"
						name="titre"
						id="nomBillet"
						placeholder="Titre de l'article de blogue"
					/>
				</div>
			</div>
			<div class="field">
				<textarea
                        class="textarea"
                        name="article"
                        id="article"
                        placeholder="Corp de l'article"
                        rows="15"
				></textarea>
			</div>
			<div class="columns">
				<div class="field column">
					<label class="label" for="photo_1"
						>Première photo (seras aussi utilisée pour la miniature de l'article)</label
					>
					<div class="control">
						<input class="input" type="file" name="photo_1" id="photo_1" />
					</div>
				</div>
				<div class="field column">
					<label class="label" for="photo_2">deuxième photo</label>
					<div class="control">
						<input class="input" type="file" name="photo_2" id="photo_2" />
					</div>
				</div>
			</div>
            <div class="block has-text-right">
                <SubmitButon texte={'Enregistrer'} />
                <Retour />
            </div>
		</div>
	</div>
</form>
