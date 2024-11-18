<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
	import NotifDanger from "../../../lib/components/notifications/notifDanger.svelte";
	import NotifSuccess from "../../../lib/components/notifications/notifSuccess.svelte";
</script>

<H1Title title={"Tous les billets de blog"} />
<NotifDanger />
<NotifSuccess />
<p class="has-text-centered">En construction!</p>
<a href="./blogue/nouveau" class="button is-primary-blue">Nouveau</a>