
export async function load({ cookies, parent }){
    const { cookiesAll } = await parent();
    return ({cookiesAll: cookiesAll, })
    
}
