
export async function load({ cookies }){
    const cookiesAll = cookies.getAll();
    const session = cookies.get('session');
    
    return({cookiesAll: cookiesAll, session});
}