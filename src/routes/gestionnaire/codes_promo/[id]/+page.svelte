<script>
	import H1Title from '$lib/components/titres/h1Title.svelte';
    import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
    import Retour from '$lib/components/generaux/retour.svelte';
	import NotifDanger from '$lib/components/notifications/notifDanger.svelte';
	import NotifSuccess from '$lib/components/notifications/notifSuccess.svelte';
	//import { modificationCodePromo } from '$lib/outils/formHandlers';
	import Confirmation from '$lib/components/notifications/confirmation.svelte';

    export let data;
    const { code } = data;
</script>

<H1Title title={"Modification d'un code promo"} />
<NotifDanger />
<NotifSuccess />

<form on:submit> <!-- |preventDefault={modificationCodePromo} -->
	<div class="section">
		<div class="box">
            <input name="id" value="{code.id}" hidden readonly />

			<div class="field">
				<label class="label" for="nom">Partenaire <span class="rouge">*</span></label>
				<div class="control">
					<input
						class="input"
						type="text"
						name="nom"
						id="nom"
						placeholder="Nom du partenaire"
                        value="{code.nom}"
                        required
					/>
				</div>
			</div>

            <div class="field">
				<label class="label" for="code">Code <span class="rouge">*</span></label>
				<div class="control">
					<input
						class="input"
						type="text"
						name="code"
						id="code"
						placeholder="Code"
                        value="{code.code}"
                        required
					/>
				</div>
			</div>

			<div class="field">
                <label class="label" for="avantage">Avantage <span class="rouge">*</span></label>
				<textarea
                        class="textarea"
                        name="avantage"
                        id="avantage"
                        placeholder="Description de l'avantage"
                        rows="5"
                        value="{code.avantage}"
                        required
				></textarea>
            </div>

            <div class="field">
                <label class="label" for="expiration">Date d'expiration</label>
					<div class="control">
						<input
                            class="input"
                            type="date"
                            name="expiration"
                            id="expiration"
                            value="{code.expiration}"
                        />
					</div>
			</div>

            <div class="field">
                <label class="label" for="logo">Logo</label>
                <div class="control">
                    <input
                        class="input"
                        type="file"
                        accept="image/png, image/jpeg, image/svg"
                        name="logo"
                        id="logo"
                    />
                </div>
                {#if code.logo}
                    <figure class="image is-128x128">
                        <img class="block" src="/{code.logo}" alt="logo" />
                    </figure>
                {/if}
            </div>
			
            <div class="block has-text-right">
                <SubmitButon texte={'Enregistrer'} />
                <Retour />
            </div>
			<div class="block has-text-right">
				<Confirmation but='code_promo' id={code.id} />
			</div>
		</div>
	</div>
</form>