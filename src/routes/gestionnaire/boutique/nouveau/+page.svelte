<script>
	import H1Title from '$lib/components/titres/h1Title.svelte';
	import { onMount } from 'svelte';
	import SubmitButon from '../../../../lib/components/formulaires/submitButon.svelte';
    import Retour from '../../../../lib/components/generaux/retour.svelte';
	import { creationProduit } from '../../../../lib/outils/formHandlers';
	
	export let data;
	const { types } = data;

	onMount(()=>{
        const actives = document.querySelectorAll('a.is-active');
        actives.forEach((x)=>x.classList.remove('is-active'));
    document.getElementById('boutiquenouveau').classList.add('is-active')
    });

	let prix_1 = "Prix visiteur";
	let prix_2 = "Prix abonné";
	function changePrix(event){
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

<H1Title title={"Ajouter un produit"} />
<div class="section">
	<form on:submit|preventDefault={creationProduit}>
		<div class="columns">
			<div class="column is-half">
				<div class="field">
					<label for="nom" class="label">Nom</label>
					<div class="control">
						<input name="nom" type="text" class="input" placeholder="Nom du produit"/>
					</div>
				</div>
				<div class="field">
					<label for="type" class="label">Type</label>
					<div class="control">
						<div class="select is-fullwidth">
							<select name="type_id" id="type" on:change={changePrix}>
								<option  disabled selected>Choisissez un type de produit</option>
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
						<textarea name="desc" id="desc" class="textarea" placeholder="Description du produit"></textarea>
					</div>
				</div>
				<div class="field">
					<label for="url" class="label">url</label>
					<div class="control">
						<input type="text" class="input" name="url">
					</div>
				</div>
			</div>
			<div class="column is-half">
				<div class="field">
					<label for="prix_v" class="label">{prix_1}</label>
					<div class="control">
						<input type="text" class="input" name="prix_v" />
					</div>
				</div>
				<div class="field">
					<label for="prix_a" class="label">{prix_2}</label>
					<div class="control">
						<input type="text" class="input" name="prix_a"/>
					</div>
				</div>
				<div class="field">
					<label for="photo" class="label">Photo</label>
					<div class="contol">
						<input type="file" class="input" accept="image/*" name="photo" />
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
								/>
							</div>
						</label>
					</div>
				</div>
			</div>
		</div>
        <div class="block has-text-right">
			<SubmitButon texte={'Enregistrer'}></SubmitButon>
			<Retour />
		</div>
	</form>
</div>
