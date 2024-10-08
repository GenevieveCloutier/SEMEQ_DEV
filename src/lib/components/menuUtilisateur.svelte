<script>
    import { page } from '$app/stores';
    import { derived } from 'svelte/store';

    // Store dérivé pour obtenir le chemin actuel
    const currentPath = derived(page, $page => $page.url.pathname);

    // Fonction pour vérifier si le lien est actif
    function isActive(path) {
        return $currentPath === path;
    }
</script>

<div class="column is-one-fifth">

    <aside class="menu is-hidden-mobile is-hidden-tablet-only"> <!-- Masqué sur mobile et tablette -->
        <ul class="menu-list">
            <li><a href="/#">Mon compte</a></li>
            <li><a href="/#">Mes événements</a></li>
            <li><a href="/appels_candidatures" class:active={isActive('/appels_candidatures')}>Appels de candidatures</a></li>
            <li><a href="/#">Mes avantages</a></li>
            <li><a href="/#">Mes formations et outils</a></li>
            <li><a href="/#">Historique d'achat</a></li>
            <div class="espace"></div>
            <li><a href="/deconnexion" class="bouton-deconnexion">Déconnexion</a></li>
        </ul>
    </aside>

</div>

<style>
    .menu {
        border-right: 3px solid darkgray;
        padding-right: 15px;
        margin-right: 25px;
    }

    .active {
        color: #c2108a;
    }
    
    a:hover {
		background-color: #184287;
		color: white;
	}
    
    .bouton-deconnexion {
		background-color: #d9d9d9;
		border-radius: 5px;
		color: black;
    }

    .bouton-deconnexion:hover {
		background-color: rgba(255, 0, 0, 0.599);
	}

    .espace {
        height: 2em;
    }
</style>