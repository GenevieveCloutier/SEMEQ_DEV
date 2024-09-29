export async function nouveauCompte(event) {
    const formData = new FormData(event.target);
    
        const response = await fetch('?/new', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        console.log(result);
        
        if (result.type === 'success') {
            alert('Nouvel utilisateur enregistré');
        } else {
            alert('Erreur : ' + JSON.parse(result.data)[0]);
        }
}
