<script>
    import { page } from '$app/stores';

    export let data;
    let role = data?.role;
    let id = data?.id;
    let abonne = data?.abonne;

    // Pour ne pas afficher le layout pour les pages de factures
    $: facture = $page.url.pathname.startsWith(`/${id}/achats/`);
</script>

<!-- Si la page affichée n'est pas une page de facture, insérer le menu utilisateur, sinon, mettre juste le slot-->
{#if !facture}

    <div class="columns">
        <div class="column is-2 ml-2">
            <aside class="menu is-hidden-mobile">
                <ul class="menu-list">
                    <li><a href={`/${id}`} id="monCompte">Mon compte</a></li>
                    <li><a href={`/${id}/mes_evenements`} id="mesEvenements">Mes événements</a></li>
                    {#if role === '3' && abonne === true || role === '1'}
                    <li><a href={`/${id}/appels_candidatures`} id="appelsCandidatures">Appels de candidatures</a></li>
                    {/if}
                    {#if abonne === true || role === '1'}
                    <li><a href={`/${id}/mes_avantages`} id="mesAvantages">Mes avantages</a></li>
                    {/if}
                    <li><a href={`/${id}/formations_outils`} id="formationsOutils">Mes formations et outils</a></li>
                    <li><a href={`/${id}/achats`} id="achats">Historique d'achat</a></li>
                    <div class="espace"></div>
                    <li><a href="/deconnexion" class="bouton-deconnexion">Déconnexion</a></li>
                </ul>
            </aside>
        </div>
        <div class="column">
        <slot />
        </div>
    </div>
    
{:else}
  <slot />

{/if}

<style> 
    .menu {
        border-right: 3px solid darkgray;
        padding-right: 15px;
        margin-right: 25px;
    }

    .bouton-deconnexion {
		background-color: #d9d9d9;
		border-radius: 5px;
		color: black;
        text-align: center;
    }

    .bouton-deconnexion:hover {
		background-color: rgba(255, 0, 0, 0.599);
	}

    .espace {
        height: 2em;
    }
</style>