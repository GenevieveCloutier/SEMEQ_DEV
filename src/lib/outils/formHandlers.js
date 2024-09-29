export async function nouveauCompte(event) {
    const formData = new FormData(event.target);
    
        const response = await fetch('api?/new', {
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

export async function handleUserDelete(event)
{
    //mettre un premier niveau de securite ici pour verifier les droits
    console.log('delete 1');
    
    const formData = new FormData(event.target);
    
        const response = await fetch('?/del', {
            method: 'POST',
            body: formData
        });
    
    const result = await response.json();

    if (result.type === 'success') {
        alert('Utilisateur supprimé');
    } else {
        alert('Erreur : ' + JSON.parse(result.data)[0]);
    }
}