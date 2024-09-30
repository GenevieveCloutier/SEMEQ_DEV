<script>
    import { connexion } from '../../lib/outils/formHandlers';
    </script>
    
    <h1 class="title">Connexion</h1>
    <div class="section">
        <form on:submit|preventDefault={connexion}>
            <input type="text" name="courriel" id="courriel"><br>
            <input type="text" name="password" id="password"><br>
            <button type="submit" class="button">Valider</button>
        </form>
    </div>