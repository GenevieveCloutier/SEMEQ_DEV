<script context=module>
	import { setContext, getContext } from 'svelte';
	import { writable } from 'svelte/store';

	const key = {};

	export const getAccordionContext = () => getContext(key);
	export const createAccordionContext = () => {
		const current = writable(null);
		const context = { current };
		setContext(key, context);

		return context;
	}
</script>

<script>
    import { slide } from 'svelte/transition';
    import { quadInOut } from 'svelte/easing';
	import { onMount } from 'svelte';

    export let open = false;

	const { current } = getAccordionContext();
	const currentKey = {};

	createAccordionContext();

	onMount(() => {
    const menu = document.getElementById('navMenu');

    if (menu) {
        menu.addEventListener('click', () => {
            menu.classList.toggle('is-active');
        });
	}
});

    function handleClick() {
        open = !open
				if (open)
					$current = currentKey;
    }

    // Variable pour suivre si la souris est dans le menu
    let souris = false; 

    //si la souris est dans le menu, le laisser ouvert
    function handleEntreeSouris() {
        souris = true;
        open = true;
    }

    // si la souris est sortie du menu, le fermer
    function handleSortieSouris() {
        souris = false; 
        setTimeout(() => {
            if (!souris) {
                open = false;}}, 100); 
    }

	$: if ($current != currentKey) {
		open = false;
	}
</script>

<div
	class="accordion"
    	role="button"
		tabindex="0"
	    on:mouseenter={handleEntreeSouris}
	    on:mouseleave={handleSortieSouris}
>
	<div id="navMenu" class="header" role="button" tabindex="0">
		<!-- Si ouvert, afficher la flèche vers le haut -->
		{#if open}
            <button on:click={handleClick}>
                <slot name="head"></slot>
                <i class="fa-solid fa-chevron-up"></i>
            </button>

		<!-- Si fermé, afficher la flèche vers le bas -->
		{:else}
            <button class="">
                <slot name="head"></slot>
                <i class="fa-solid fa-chevron-down"></i>
            </button>
		{/if}
	</div>

	<!-- Si ouvert, afficher les détails -->
	{#if open}
        <div
            role="button"
            tabindex="0"
            class="details"
            transition:slide="{{ duration: 150, easing: quadInOut }}">
            <slot name="details"></slot>
        </div>
	{/if}

</div>

<style>

	.bordure{
		border:1px solid black;
	}
	div.accordion {
		margin: 1rem 0;
	}

	div.header {
		display: flex;
		justify-content: center;
	
	}

	div.details {
		width: 175%;
		display: flex;
		background-color: white;
	}

	.fa-chevron-down, .fa-chevron-up {
		color: #184287;
	}
</style>
