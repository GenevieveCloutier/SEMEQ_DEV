
export async function load({ cookies }){
    const session = cookies.get('session');
    const role = cookies.get('role');
    const id = cookies.get('id');
    
    return({session, role, id});
}