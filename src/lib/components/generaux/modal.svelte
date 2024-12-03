<script>
    export let image;


//Enregistre l'image cliquée
  let imageCliquee = null;

//Fonction pour agrandir l'image
  function agrandirImage(url) {
    imageCliquee = url;
  }

//Fonction pour fermer l'image agrandie
  function fermerImage() {
    imageCliquee = null;
  }

</script>
        <!-- aller chercher les infos de l'image cliquée -->
        <button on:click={() => agrandirImage(image)}><img class="imageCarree" src={image} alt="Kiosque de  marché"/></button>
      
    <!-- Pour afficher l'image agrandie -->
      {#if imageCliquee}
     
            <div class="modal" on:click={fermerImage}>
                <div class="modal-background"></div>
                    <div class="modal-content">
                            <img src={imageCliquee}  alt="Image agrandie" />
          
                        <button class="modal-close is-large" on:click={fermerImage}></button>
                    
                    </div>
            </div>
            
   
      {/if}

<style>

.modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    img:hover {
        transform: scale(1.1);
    }

    .imageCarree{
        width: 175px;
        aspect-ratio: 1/1;
        object-fit: cover;
    }



</style>