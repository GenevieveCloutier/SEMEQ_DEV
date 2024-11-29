import { findOne } from '$lib/db/controllers/Utilisateurs.controller';

export async function load({ cookies }){
    const session = cookies.get('session');
    const role = cookies.get('role');
    const id = cookies.get('id');
    let abonne;

    // if(id){
    //     const user = await findOne({ id: id });
    //     abonne = user.abonne;
    // }
    
    
    return({session, role, id, abonne});
}