<script>
	import { onDestroy, onMount } from "svelte";
  

    export let siteKey;
    let turnstileWidget;
  
    // Une fois monté, initialise le widget
    onMount(() => {
      turnstileWidget = turnstile.render('#turnstile-element', {
        sitekey: siteKey,
        callback: (token) => {
          console.log('Token: ', token);//Verifier le token si besoin de plus de sécurité
        },
      });
    });
  
    // Nettoyer à la destruction
    onDestroy(() => {
      if (turnstileWidget) {
        turnstile.remove(turnstileWidget);
      }
    });
  </script>
  
  <div id="turnstile-element"></div>
  