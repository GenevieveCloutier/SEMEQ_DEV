<script>
	import H1Title from '$lib/components/titres/h1Title.svelte';
    import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
    import Retour from '$lib/components/generaux/retour.svelte';
	import NotifDanger from '$lib/components/notifications/notifDanger.svelte';
	import NotifSuccess from '$lib/components/notifications/notifSuccess.svelte';
	import { modificationBillet } from '$lib/outils/formHandlers';
	import Confirmation from '../../../../lib/components/notifications/confirmation.svelte';

    export let data;
    const { blogue } = data;
</script>

<H1Title title={"Modification d'un nouveau billet de blog"} />
<NotifDanger />
<NotifSuccess />
<form on:submit|preventDefault={modificationBillet}>
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
                        value="{blogue.titre}"
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
				>{blogue.article}</textarea>
			</div>
			<div class="columns">
				<div class="field column">
					<label class="label" for="photo_1"
						>Première photo (seras aussi utilisée pour la miniature de l'article)</label
					>
					<div class="control block">
						<input class="input" type="file" name="photo_1" id="photo_1" />
					</div>
                    {#if blogue.image_1}
								<figure class="image is-256x256">
									<img class="block" src="/{blogue.image_1}" alt="image_1" />
								</figure>
							{/if}
				</div>
				<div class="field column">
					<label class="label" for="photo_2">deuxième photo</label>
					<div class="control block">
						<input class="input" type="file" name="photo_2" id="photo_2" />
					</div>
                    {#if blogue.image_2}
								<figure class="image is-256x256">
									<img class="block" src="/{blogue.image_2}" alt="image_1" />
								</figure>
							{/if}
				</div>
			</div>
			<input name="id" value="{blogue.id}" hidden readonly>
            <div class="block has-text-right">
                <SubmitButon texte={'Enregistrer'} />
                <Retour />
            </div>
			<div class="block has-text-right">
				<Confirmation but='blogue' id={blogue.id} />
			</div>
		</div>
	</div>
</form>
