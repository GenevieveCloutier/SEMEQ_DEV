<script>
    let erreur = null;
    async function handleSubmit(event)
    {
        const formData = new FormData(event.target);

        const response = await fetch('?/new', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (result.type == 'failure')
            erreur = JSON.parse(result.data)[0];
        else
            alert('nouvel utilisateur enregistré');
    }
</script>

<h1 class="title">Creer un compte</h1>
<div class="section">
    <form on:submit|preventDefault={handleSubmit}>
        <input type="text" name="courriel" id="courriel"><br>
        <input type="text" name="password" id="password"><br>
        <button type="button" class="button">Valider</button>
    </form>
</div>