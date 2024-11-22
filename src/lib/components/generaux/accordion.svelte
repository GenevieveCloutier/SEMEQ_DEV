<script context=module>

    //références pour la création de l'accordéon: 
        //https://svelte.dev/playground/c109f83f3c114cb7829f04fe2440ef94?version=4.2.19

    //référence pour refermer une section avant d'en ouvrir une autre: 
        //https://svelte.dev/playground/29bf8248d5044e12877e9cbec9381115?version=3.48.0
        
	import { setContext, getContext } from 'svelte';
	import { writable } from 'svelte/store';
    export let fonction = () => {};
	
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
    
    export let open = false;
	
		const { current } = getAccordionContext();
		const currentKey = {};
	
		createAccordionContext();

    function handleClick() {
        open = !open
				if (open)
					$current = currentKey;
    }
	
		$: if ($current != currentKey)
			open = false;
</script>
  
  <div class="accordion ">
      <div class="header">

            <!-- si ouvert, afficher la flèche par en haut -->
            {#if open}
            <button class="is-flex is-align-items-center is-justify-content-space-between"
                on:click={handleClick} 
                on:click={fonction} >
            <slot name="head"></slot>
                <i class="fa-solid fa-chevron-up"></i>
            </button>

            <!-- si fermé, afficher la flèche par en bas -->
            {:else}
            <button class="is-flex is-align-items-center is-justify-content-space-between"
                on:click={handleClick}>
            <slot name="head"></slot>
                <i class="fa-solid fa-chevron-down"></i>
            </button>
            {/if}
        
      </div>
      
            <!-- si ouvert, afficher le texte / résulats -->
            {#if open}
            <div class="details" transition:slide="{{ duration: 150, easing: quadInOut }}" >
                <slot name="details"></slot>
            </div>
            {/if}

  </div>
  
  <style>
      div.accordion {
          margin: 1rem 0;
      }
      
      div.header {
          display:flex;
          width:100%;
      }
      
      div.header .text {
          flex: 1;
          margin-right: 5px;
      }
      
      div.details {
          background-color: white;
          padding:1rem;
      }
      .fa-chevron-down, .fa-chevron-up{
        color: #184287;
      }
  </style>