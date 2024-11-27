<script>
    export let logo, nom, avantage, code, expiration;  
</script>

<div class="cell">
    <div class="card">
        <div class="card-image">
        <figure class="image is-1by1">
                <img src="{logo}" alt="{nom}"/>
        </figure>
        </div>

        <div class="card-content">
            <div class="content has-text-centered">
                <div>{avantage}</div>
            </div>
        </div>

        <footer class="card-footer">
            <div class="content has-text-centered">
                Code promo : <b>{code}</b><br>
                {#if expiration != "Aucune"}
                    Date d'expiration : <b>{expiration}</b>
                {:else}
                    Aucune date d'expiration
                {/if}
            </div>
        </footer>
    </div>
</div>

<style>
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
        justify-content: center;
    }
</style>