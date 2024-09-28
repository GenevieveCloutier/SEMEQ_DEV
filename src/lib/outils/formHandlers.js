export async function nouveauCompte(event) {
    const formData = new FormData(event.target);
    
    try {
        const response = await fetch('?/new', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        
        if (result.type === 'failure') {
            alert('Erreur : ' + JSON.parse(result.data)[0]);
        } else {
            alert('Nouvel utilisateur enregistré');
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi du formulaire :', error);
    }
}