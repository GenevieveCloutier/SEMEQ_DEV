<script>
import { nouveauCompte } from '../../lib/outils/formHandlers';
</script>

<h1 class="title">Creer un compte</h1>
<div class="section">
    <form on:submit|preventDefault={nouveauCompte}>
        <input type="text" name="courriel" id="courriel"><br>
        <input type="text" name="password" id="password"><br>
        <button type="submit" class="button">Valider</button>
    </form>
</div>