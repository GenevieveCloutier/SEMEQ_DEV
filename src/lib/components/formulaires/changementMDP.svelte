<script>
    import { fly } from "svelte/transition";
    import { modifMdp } from "../../outils/formHandlers";
    import Retour from "$lib/components/generaux/retour.svelte";
	import { log } from "../../outils/debug";
    
    export let user;

	let help = null;
	let nouveauMdp;
	function compareMdp() {
        //log("user = ", user)
		const mdp1 = document.getElementById('pwdNouveau1');
		const mdp2 = document.getElementById('pwdNouveau2');
		const envoie = document.getElementById('envoie');

		const valid = mdp1.value === mdp2.value;
		mdp1.classList.toggle('is-success', valid);
		mdp1.classList.toggle('is-danger', !valid);
		mdp2.classList.toggle('is-success', valid);
		mdp2.classList.toggle('is-danger', !valid);
		envoie.toggleAttribute('disabled', !valid);
		help = valid ? null : 'Les mots de passe ne correspondent pas';
		nouveauMdp = valid ? mdp2.value : null;
	}
</script>

<div
	class="box"
	in:fly={{ y: -200, duration: 400, delay: 400 }}
	out:fly={{ y: 200, duration: 300 }}
>
	<div class="columns">
		<div class="column is-half">
			<div class="field">
				<label class="label" for="pwdActuel">Mot de passe actuel <span class="rouge">*</span></label
				>
				<div class="control">
					<input
						class="input"
						type="password"
						name="pwdActuel"
						id="pwdActuel"
						placeholder="**********"
						required
					/>
				</div>
				<div class="field">
					<label class="label" for="pwdNouveau1"
						>Nouveau mot de passe <span class="rouge">*</span></label
					>
					<div class="control">
						<input
							class="input"
							type="password"
							name="pwdNouveau1"
							id="pwdNouveau1"
							placeholder="**********"
							required
						/>
					</div>
					<div class="field">
						<label class="label" for="pwdNouveau2"
							>Confirmer le nouveau mot de passe <span class="rouge">*</span></label
						>
						<div class="control">
							<input
								class="input"
								type="password"
								name="pwdNouveau2"
								id="pwdNouveau2"
								placeholder="**********"
								required
								on:input={compareMdp}
							/>
						</div>
						{#if help}
							<p class="help is-danger">{help}</p>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="block has-text-right">
	<button
		class="button is-primary-blue is-dark"
		on:click|preventDefault={modifMdp(user, document.getElementById('pwdActuel').value, nouveauMdp)}
		id="envoie"
		disabled
	>
		Enregistrer
	</button>
	<Retour />
</div>
