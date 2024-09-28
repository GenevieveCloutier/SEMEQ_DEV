export async function load({ cookies }){
    const cookiesAll = cookies.getAll();
    console.log('dans le layout ',cookiesAll);
    
    return({cookiesAll: cookiesAll});
}