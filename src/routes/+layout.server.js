import { findOne } from '$lib/db/controllers/Utilisateurs.controller';

export async function load({ cookies }){
    const session = cookies.get('session');
    const role = cookies.get('role');
    const id = cookies.get('id');

    const user = await findOne({ id: id });
    let abonne = user.abonne;
    
    return({session, role, id, abonne});
}