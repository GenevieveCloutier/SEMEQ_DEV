<script>
	import { fly } from 'svelte/transition';
	import Retour from '../generaux/retour.svelte';
	import { handleUserDelete, suppressionEvenement, suppressionBlogue, suppressionProduit, supprimeCodePromo, deleteAllUserCart } from '../../outils/formHandlers';

	export let id, but;
	let confirmation = false;
	let texte =
		but == 'evenement'
			? "Supprimer l'événement"
			: but == 'compte'
				? 'Supprimer mon compte'
				: but == 'blogue'
					? "Supprimer l'article"
					: but == 'produit'
						? "Supprimer le produit"
							: but == 'code_promo'
							? "Supprimer le code promo"
								: but == 'panier'
								? "Vider le panier"
								: null;
</script>

<button
	class="button is-danger"
	on:click|preventDefault={() => {
		confirmation = !confirmation;
	}}>{texte}</button
>

{#if confirmation && but == 'compte'}
	<div
		class="box has-text-centered popup"
		in:fly={{ y: 200, duration: 1500 }}
		out:fly={{ y: -200, duration: 1500 }}
	>
		<p>Voulez vous vraiment supprimer votre compte?</p>
		<p class="help">
			Cette action est irréversible et entraîneras la suppression de toutes vos données.
		</p>
		<div class="block">
			<button
				class="button"
				on:click|preventDefault={() => {
					confirmation = !confirmation;
				}}>Retour</button
			>
			<button class="button is-danger" on:click|preventDefault={handleUserDelete(id)}>
				Confirmer la suppression</button
			>
		</div>
	</div>
{/if}

{#if confirmation && but == 'evenement'}
	<div
		class="box has-text-centered popup"
		in:fly={{ y: 200, duration: 1500 }}
		out:fly={{ y: -200, duration: 1500 }}
	>
		<p>Voulez vous vraiment supprimer votre événement?</p>
		<p class="help">
			Cette action est irréversible et entraîneras la suppression de toutes les données liées à
			cet événement.
		</p>
		<div class="block">
			<button
				class="button"
				on:click|preventDefault={() => {
					confirmation = !confirmation;
				}}>Retour</button
			>
			<button class="button is-danger" on:click|preventDefault={suppressionEvenement(id)}>
				Confirmer la suppression</button
			>
		</div>
	</div>
{/if}

{#if confirmation && but == 'blogue'}
	<div
		class="box has-text-centered popup"
		in:fly={{ y: 200, duration: 1500 }}
		out:fly={{ y: -200, duration: 1500 }}
	>
		<p>Voulez vous vraiment supprimer cet article ?</p>
		<p class="help">
			Cette action est irréversible et entraîneras la suppression de toutes les données liées à
			cet article.
		</p>
		<div class="block">
			<button
				class="button"
				on:click|preventDefault={() => {
					confirmation = !confirmation;
				}}>Retour</button
			>
			<button class="button is-danger" on:click|preventDefault={suppressionBlogue(id)}>
				Confirmer la suppression</button
			>
		</div>
	</div>
{/if}

{#if confirmation && but == 'produit'}
	<div
		class="box has-text-centered popup"
		in:fly={{ y: 200, duration: 1500 }}
		out:fly={{ y: -200, duration: 1500 }}
	>
		<p>Voulez vous vraiment supprimer ce produit ?</p>
		<p class="help">
			Cette action est irréversible et entraîneras la suppression de toutes les données liées à
			ce produit.
		</p>
		<div class="block">
			<button
				class="button"
				on:click|preventDefault={() => {
					confirmation = !confirmation;
				}}>Retour</button
			>
			<button class="button is-danger" on:click|preventDefault={suppressionProduit(id)}>
				Confirmer la suppression</button
			>
		</div>
	</div>
{/if}

{#if confirmation && but == 'code_promo'}
	<div
		class="box has-text-centered popup"
		in:fly={{ y: 200, duration: 1500 }}
		out:fly={{ y: -200, duration: 1500 }}
	>
		<p>Voulez vous vraiment supprimer le code promo?</p>
		<p class="help">
			Cette action est irréversible et entraîneras la suppression de toutes les données liées à
			ce code promo.
		</p>
		<div class="block">
			<button
				class="button"
				on:click|preventDefault={() => {
					confirmation = !confirmation;
				}}>Retour</button
			>
			<button class="button is-danger" on:click|preventDefault={supprimeCodePromo(id)}>
				Confirmer la suppression</button
			>
		</div>
	</div>
{/if}

{#if confirmation && but == 'panier'}
	<div
		class="box has-text-centered popup"
		in:fly={{ y: 200, duration: 1500 }}
		out:fly={{ y: -200, duration: 1500 }}
	>
		<p>Veux-tu vraiment vider ton panier?</p>
		<p class="help">
			Cette action entraîneras la suppression de tous les produits dans ton panier.
		</p>
		<div class="block">
			<button
				class="button"
				on:click|preventDefault={() => {
					confirmation = !confirmation;
				}}>Retour</button
			>
			<button class="button is-danger" on:click|preventDefault={deleteAllUserCart(id)}>
				Confirmer la suppression</button
			>
		</div>
	</div>
{/if}

<style>
	.popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 9999; /* Mettre un z-index élevé pour être au-dessus de tout */
	}
</style>
