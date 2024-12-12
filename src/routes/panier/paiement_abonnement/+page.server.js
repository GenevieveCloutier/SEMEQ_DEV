import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { Panier } from '$lib/db/models/Panier.model';
import { Utilisateur } from "$lib/db/models/Utilisateur.model";
import { Produit } from "$lib/db/models/Produit.model";
import { Type } from "$lib/db/models/Type.model";
import { findOne } from '$lib/db/controllers/Utilisateurs.controller';
import { PAYPAL_CLIENT_ID } from '$env/static/private';
//import { PAYPAL_CLIENT_ID } from 'virtual:$env/static/private';
export async function load({ cookies }){
    
    const session = cookies.get('session');
    if (!session) {
        throw redirect(307, '/login');
    }
    const sessionId = cookies.get('id');
    const utilisateur = await findOne({ id: sessionId });
    const paniers = [{produit_id: -1, produit: {prix: 10}}];

    return { paniers, utilisateur, PAYPAL_CLIENT_ID }
}