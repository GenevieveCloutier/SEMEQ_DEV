<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
    import Retour from '$lib/components/generaux/retour.svelte';
    import NotifDanger from '$lib/components/notifications/notifDanger.svelte';
	import NotifSuccess from '$lib/components/notifications/notifSuccess.svelte';
	import { creationCodePromo } from '$lib/outils/formHandlers';
	
	export let data;
	const categories = data.categories;
	const produits = data.produits;
	const types = data.types;

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

<form on:submit|preventDefault={creationCodePromo}>
	<div class="section">
		<div class="box">
			<div class="field">
				<label class="label" for="nom">Partenaire <span class="rouge">*</span></label>
				<div class="control">
					<input
						class="input"
						type="text"
						name="nom"
						id="nom"
						placeholder="Nom du partenaire"
                        required
					/>
				</div>
			</div>

			<div class="columns">
				<div class="column is-half">
					<div class="field">
						<label class="label" for="code">Code <span class="rouge">*</span></label>
						<div class="control">
							<input
								class="input"
								type="text"
								name="code"
								id="code"
								placeholder="Code"
								required
							/>
						</div>
					</div>
				</div>

				<div class="column is-half">
					<div class="field">
						<label class="label" for="rabais">Rabais (en %)</label>
						<div class="control">
							<input
								class="input"
								type="text"
								name="rabais"
								id="rabais"
								placeholder="Pour 15% inscrire 0.15"
							/>
						</div>
					</div>
				</div>
			</div>

			<div class="field">
                <label class="label" for="avantage">Avantage <span class="rouge">*</span></label>
				<textarea
                        class="textarea"
                        name="avantage"
                        id="avantage"
                        placeholder="Description de l'avantage (ne pas ré-inscrire le % de rabais)"
                        rows="5"
                        required
				></textarea>
            </div>

			<div class="columns">
				<div class="column is-half">
					<div class="field">
						<label for="categorie_id" class="label">Catégorie de partenaire <span class="rouge">*</span></label>
						<div class="control">
							<div class="select is-fullwidth">
								<select name="categorie_id" id="categorie_id" required>
									<option  disabled selected>Choisissez une catégorie de partenaire</option>
									{#each categories as categorie}
										<option value={categorie.id}>{categorie.nom}</option>
									{/each}
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="column is-half">
					<div class="field">
						<label class="label" for="expiration">Date d'expiration</label>
							<div class="control">
								<input class="input" type="date" name="expiration" id="expiration" />
							</div>
					</div>
				</div>
			</div>

			<div class="container has-text-centered">
				<p><i>
					Si le code promo peut-être utilisé sur la boutique SÉMEQ, merci de choisir un produit OU un type de produit
					pour le rabais.
				</i></p>
			</div>
			<div class="columns">
				<div class="column is-half">
					<div class="field">
						<label for="produit_id" class="label">Produit</label>
						<div class="control">
							<div class="select is-fullwidth">
								<select name="produit_id" id="produit_id" required>
									<option>Choisissez un produit sur lequel appliquer le rabais</option>
									{#each produits as produit}
										<option value={produit.id}>{produit.nom}</option>
									{/each}
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="column is-half">
					<div class="field">
						<label for="type_id" class="label">Types de produits</label>
						<div class="control">
							<div class="select is-fullwidth">
								<select name="type_id" id="type_id">
									<option>Choisissez un type de produit sur lequel appliquer le rabais</option>
									{#each types as type}
										<option value={type.id}>{type.nom}</option>
									{/each}
								</select>
							</div>
						</div>
					</div>
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
			</div>
            <div class="block has-text-right">
                <SubmitButon texte={'Ajouter le code'} />
                <Retour />
            </div>
		</div>
	</div>
</form>