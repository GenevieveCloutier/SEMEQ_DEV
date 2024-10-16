<script>

    // ceci a servi de base pour faire le component accordion
    // https://svelte.dev/repl/c109f83f3c114cb7829f04fe2440ef94?version=4.2.19

    export let open = false;
      import { slide } from 'svelte/transition';
      const handleClick = () => open = !open
  </script>
  
  <div class="accordion">
      <div class="header">

            <!-- si ouvert, afficher la flèche par en haut -->
            {#if open}
            <button on:click={handleClick} >
                <slot name="head"></slot>
                <i class="fa-solid fa-chevron-up"></i>
            </button>

            <!-- si fermé, afficher la flèche pas en bas -->
            {:else}
            <button on:click={handleClick} >
                <slot name="head"></slot>
                <i class="fa-solid fa-chevron-down"></i>
            </button>
            {/if}
        
      </div>
      
            <!-- si ouvert, afficher le texte / résulats -->
            {#if open}
            <div class="details" transition:slide>
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