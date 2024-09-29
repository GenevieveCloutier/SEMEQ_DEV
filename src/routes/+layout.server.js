export async function load({ cookies }){
    const cookiesAll = cookies.getAll();
    
    return({cookiesAll: cookiesAll});
}