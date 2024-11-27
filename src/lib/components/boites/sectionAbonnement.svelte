<script>
    export let id, photo, nom, desc, prix, prix_sup;
    
</script>

<div class="cell">
    <div class="card">
        <div class="card-image">
          <figure class="image is-1by1">
            <a href="./boutique/{id}">
                <img src="{photo}" alt="Photo {nom}"/>
            </a>
          </figure>
        </div>

        <div class="card-content">
            <div class="content">
                <b>{nom}</b><br>
                <div class="tronquer-desc-2lignes">{desc}</div><br>
                <b>Prix de base: </b>{prix}<br>
                <b>Prix par supplément: </b>{prix_sup}<br>
            </div>
        </div>
        <footer class="card-footer">
            <a href={`./boutique/${id}`} id="btnDetails" class="button is-fullwidth">Plus de détails</a>
        </footer>
    </div>
</div>

<style>
    #btnDetails {
		background-color: #d9d9d9;
		border-radius: 0.25rem;
		color: black;
	}

    .cell {
        display: flex;          /* Égaliser la hauteur des cell d'une même ligne */
        flex-direction: column; /* Égaliser la hauteur des cell d'une même ligne */
    }
    
    .card {
        height: 100%;           /* Égaliser la hauteur des card d'une même ligne */
        display: flex;          /* Égaliser la hauteur des card d'une même ligne */
        flex-direction: column; /* Égaliser la hauteur des card d'une même ligne */
    }

    .card-footer {
        margin-top: auto; /* Coller en bas de card */
        padding: 0.75rem;
        padding-top: 0rem;
    }

    /* Limiter la taille de la zone de texte des descriptions de produits sur 2 lignes */
    .tronquer-desc-2lignes {
            display: -webkit-box;
            line-clamp: 2;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
    }
</style>