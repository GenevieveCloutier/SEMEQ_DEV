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
    
    const formData = new FormData(event.target);
    
        const response = await fetch('api?/supprimeUtilisateur', {
            method: 'POST',
            body: formData
        });
    
    const result = await response.json();

    if (result.type === 'success') {
        alert('Utilisateur supprimé');
        console.log(result);
        
    } else {
        alert('Erreur : ' + JSON.parse(result.data)[0]);
    }
}

export async function connexion(event){
    console.log('dans le form handler');
    
    const formData = new FormData(event.target);
    const response = await fetch('api?/connexionUtilisateur', {
        method: 'POST',
        body: formData
    });
    console.log('apres le fetch');
    
    const result = await response.json();
    console.log('result du form handler ', result);
    
    if (result.type === 'success') {
        alert('Utilisateur connecté');
        console.log(result);
        
    } else {
        alert('Erreur : ');
    }
}