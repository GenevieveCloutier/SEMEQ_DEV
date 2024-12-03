<script>
	import H1Title from '$lib/components/titres/h1Title.svelte';
    import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
    import Retour from '$lib/components/generaux/retour.svelte';
	import NotifDanger from '$lib/components/notifications/notifDanger.svelte';
	import NotifSuccess from '$lib/components/notifications/notifSuccess.svelte';
	import { modificationCodePromo } from '$lib/outils/formHandlers';
	import Confirmation from '$lib/components/notifications/confirmation.svelte';

    export let data;
	let { code, categories, produits, types } = data;
</script>

<H1Title title={"Modification d'un code promo"} />
<NotifDanger />
<NotifSuccess />

<form on:submit|preventDefault={modificationCodePromo}>
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
                                value="{code.code}"
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
                                value="{code.rabais}"
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
                        placeholder="Description de l'avantage"
                        rows="5"
                        value="{code.avantage}"
                        required
				></textarea>
            </div>

            <div class="columns">
				<div class="column is-half">
                    <div class="field">
                        <label for="categorie_id" class="label">Catégorie de partenaire <span class="rouge">*</span></label>
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select name="categorie_id" id="categorie_id">
                                    <option value={code.categorie_id} disabled selected required>{code.categorie.nom}</option>
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
                                <input
                                    class="input"
                                    type="date"
                                    name="expiration"
                                    id="expiration"
                                    value="{code.expiration}"
                                />
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
                                    {#if code.produit_id === null}
                                        <option>Choisissez un produit sur lequel appliquer le rabais</option>
                                    {:else}
                                        <option value={code.produit_id} disabled selected required>{code.produit.nom}</option>
                                    {/if}
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
                                    {#if code.type_id === null}
                                        <option>Choisissez un type de produit sur lequel appliquer le rabais</option>
                                    {:else}
                                        <option value={code.type_id} disabled selected required>{code.type.nom}</option>
                                    {/if}
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