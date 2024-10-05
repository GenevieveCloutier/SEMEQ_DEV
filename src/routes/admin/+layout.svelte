<script>
    import { onMount } from 'svelte';
  
    function toggleMenu(labelId, menuId) {
      const label = document.getElementById(labelId);
      const menu = document.getElementById(menuId);
      
      label.addEventListener('click', () => {
        menu.classList.toggle('is-hidden-mobile');
      });
    }
  
    onMount(() => {
      toggleMenu('general-label', 'general-menu');
      toggleMenu('events-label', 'events-menu');
      toggleMenu('boutique-label', 'boutique-menu');
    });
  </script>
  
  <div class="columns">
    <div class="column is-2 ml-2">
      <aside class="menu">
        <p class="menu-label" id="general-label">Général</p>
        <ul class="menu-list is-hidden-mobile" id="general-menu">
          <li><a href="/admin" id="dashboard">Dashboard</a></li>
          <li><a href="/admin/utilisateurs" id="utilisateurs">Utilisateurs</a></li>
          <li><a href="/admin/blogue">Blogue</a></li>
        </ul>
        <p class="menu-label" id="events-label">Evénements</p>
        <ul class="menu-list is-hidden-mobile" id="events-menu">
          <li><a href="/admin/evenements">Liste des événements</a></li>
          <li><a href="/admin/evenements/nouveau">Ajouter un événement</a></li>
          <li><a href="/admin/approbations">Approbation en attente</a></li>
        </ul>
        <p class="menu-label" id="boutique-label">Boutique</p>
        <ul class="menu-list is-hidden-mobile" id="boutique-menu">
          <li><a href="/admin/articles">Liste d'article</a></li>
          <li><a href="/admin/articles/nouveau">Ajouter un article</a></li>
          <li><a href="/admin/promo">Liste des codes promos</a></li>
          <li><a href="/admin/promo/nouveau">Ajouter un code promo</a></li>
        </ul>
      </aside>
    </div>
    <div class="column">
      <slot />
    </div>
  </div>