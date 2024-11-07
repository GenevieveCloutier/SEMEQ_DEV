<script>
	import { recuperation, erreur } from '$lib/outils/formHandlers';
	import H1Title from '$lib/components/titres/h1Title.svelte';
	import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
	import Retour from '$lib/components/generaux/retour.svelte';
</script>

<H1Title title={'Demande de récupération de mot de passe'}></H1Title>
<div class="block">
	<div class="container is-fluid has-text-centered">
		<p>Un email de réinitialisation de mot de passe a été envoyé à l'adresse fournie.</p>
		<p>
			Merci de vérifier votre boîte de réception et de suivre les instructions pour réinitialiser
			votre mot de passe.
		</p>
		<p>
			Si vous ne trouvez pas l'email, pensez à vérifier vos dossiers de spam ou courriers
			indésirables.
		</p>
	</div>
</div>
