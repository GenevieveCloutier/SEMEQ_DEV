<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
    import Retour from '$lib/components/generaux/retour.svelte';
    import NotifDanger from '$lib/components/notifications/notifDanger.svelte';
	import NotifSuccess from '$lib/components/notifications/notifSuccess.svelte';
	import { creationCode } from '$lib/outils/formHandlers';

    // Mettre en évidence le lien actif dans menu latéral gestionnaire
    import { onMount } from "svelte";

    onMount(()=>{
        const actives = document.querySelectorAll('a.is-active');
        actives.forEach((x)=>x.classList.remove('is-active'));
        document.getElementById('code_promonouveau').classList.add('is-active')
    });
</script>

<H1Title title={"Ajouter un nouveau code promo"} />
<NotifDanger />
<NotifSuccess />

<form on:submit|preventDefault={creationCode}>
	<div class="section">
		<div class="box">
			<div class="field">
				<label class="label" for="partenaire">Partenaire</label>
				<div class="control">
					<input
						class="input"
						type="text"
						name="partenaire"
						id="partenaire"
						placeholder="Nom du partenaire"
					/>
				</div>
			</div>

            <div class="field">
				<label class="label" for="code">Code</label>
				<div class="control">
					<input
						class="input"
						type="text"
						name="code"
						id="code"
						placeholder="Code"
					/>
				</div>
			</div>

			<div class="field">
                <label class="label" for="avantage">Avantage</label>
				<textarea
                        class="textarea"
                        name="avantage"
                        id="avantage"
                        placeholder="Description de l'avantage"
                        rows="5"
				></textarea>
            </div>

            <div class="field">
                <label class="label" for="expiration">Date d'expiration</label>
					<div class="control">
						<input class="input" type="date" name="expiration" id="expiration" />
					</div>
			</div>

            <div class="field">
                <label class="label" for="logo">Logo</label>
					<div class="control">
						<input class="input" type="file" name="logo" id="logo" />
					</div>
			</div>
            <div class="block has-text-right">
                <SubmitButon texte={'Ajouter le code'} />
                <Retour />
            </div>
		</div>
	</div>
</form>