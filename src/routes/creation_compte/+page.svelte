<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
	import AbonnementBase from "$lib/components/boites/AbonnementBase.svelte";
	import AbonnementEven from "$lib/components/boites/abonnementEven.svelte";
	import AbonnementExposant from "$lib/components/boites/abonnementExposant.svelte";
</script>

<H1Title title={"Choisis ton type de compte"} />
<div class="container-fluid mx-6">
    <div class="columns mx-6">
        <div class="column is-one-third">
            <AbonnementBase />
        </div>

        <div class="column is-one-third">
            <AbonnementExposant />
        </div>

        <div class="column is-one-third">
            <AbonnementEven />
        </div>
    </div>
</div>



