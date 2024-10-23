<script>
    export let id, photo, nom, desc, prix_a, prix_v;
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
                <div class="tronquer-texte-card">{desc}</div><br>
                <b>Prix abonné: </b>{prix_a}<br>
                <b>Prix non-abonné: </b>{prix_v}<br>
                <div class="content has-text-centered">
                    <a href={`./boutique/${id}`}><button class="px-3 py-3">Plus de détails</button></a>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    button {
		background-color: #d9d9d9;
		border-radius: 5px;
		color: black;
	}
</style>