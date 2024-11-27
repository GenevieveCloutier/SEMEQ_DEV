<script>
	import H1Title from '$lib/components/titres/h1Title.svelte';
	import { onMount } from 'svelte';
	import SubmitButon from '../../../../lib/components/formulaires/submitButon.svelte';
    import Retour from '../../../../lib/components/generaux/retour.svelte';
    import Confirmation from '../../../../lib/components/notifications/confirmation.svelte';
	import { modificationProduit } from '../../../../lib/outils/formHandlers';
	import { log } from '../../../../lib/outils/debug';
	export let data;
	const { produit, types } = data;
	let prix_1 = "Prix visiteur";
	let prix_2 = "Prix abonné";
	onMount(() => {
		document.getElementById('dispo').checked = produit.dispo;
		if (produit.type_id == 1){
			prix_1 = "Prix de base";
			prix_2 = "Prix par suplément";
		}
		else{
			prix_1 = "Prix visiteur";
			prix_2 = "Prix abonné";
		}
	});
	

	function changePrix(event){
		log("changePrix event = ", event.target.value)
		if (event.target.value == 1){
			prix_1 = "Prix de base";
			prix_2 = "Prix par suplément";
		}
		else{
			prix_1 = "Prix visiteur";
			prix_2 = "Prix abonné";
		}
	}
</script>

<H1Title title={"Détail d'un item (modifiable)"} />
<div class="section">
	<form on:submit|preventDefault={modificationProduit}>
		<div class="columns">
			<div class="column is-half">
				<div class="field">
					<label for="nom" class="label">Nom</label>
					<div class="control">
						<input name="nom" type="text" class="input" value={produit.nom} />
					</div>
				</div>
				<div class="field">
					<label for="type" class="label">Type</label>
					<div class="control">
						<div class="select is-fullwidth">
							<select name="type_id" id="type" on:change={changePrix}>
								<option value={produit.type_id} disabled selected>{produit.type.nom}</option>
								{#each types as type}
									<option value={type.id}>{type.nom}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>
				<div class="field">
					<label for="desc" class="label">Description</label>
					<div class="control">
						<textarea name="desc" id="desc" class="textarea">{produit.desc}</textarea>
					</div>
				</div>
				<div class="field">
					<label for="url" class="label">url</label>
					<div class="control">
						<input type="text" class="input" name="url" value="{produit.url}">
					</div>
				</div>
			</div>
			<div class="column is-half">
				<div class="field">
					<label for="prix_v" class="label">{prix_1}</label>
					<div class="control">
						<input type="text" class="input" value={produit.prix_v} name="prix_v" />
					</div>
				</div>
				<div class="field">
					<label for="prix_a" class="label">{prix_2}</label>
					<div class="control">
						<input type="text" class="input" value={produit.prix_a} name="prix_a" />
					</div>
				</div>
				<div class="field">
					<label for="photo" class="label">Photo</label>
					<div class="contol">
						<input type="file" class="input" accept="image/*" name="photo"/>
						{#if produit.photo}
							<figure class="image is-256x256">
								<img class="block" src="/{produit.photo}" alt="photo produit" />
							</figure>
						{/if}
					</div>
				</div>
				<div class="field">
					<div class="control">
						<label class="checkbox label">
							Disponible
							<div class="control">
								<input
									type="checkbox"
									class="toggle exclus"
									name="dispo"
									id="dispo"
									value={produit.dispo}
								/>
							</div>
						</label>
					</div>
				</div>
			</div>
		</div>
		<input value="{produit.id}" name="id" hidden readonly>
        <div class="block has-text-right">
			<!-- Valider si SubmitButon fait la bonne action! -->
			<SubmitButon texte={'Enregistrer'}></SubmitButon>
			<Retour />
		</div>
        <div class="block has-text-right">
            <Confirmation id={produit.id} but='produit'/>
        </div>
	</form>
</div>
