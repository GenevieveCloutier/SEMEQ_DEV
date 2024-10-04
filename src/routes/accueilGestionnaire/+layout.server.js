import { redirect } from '@sveltejs/kit';

export function load ({cookies}){
    const role = cookies.get('role');
    console.log('dans le layout ', role);
    
    if(role != '1')
        redirect(302, '/');
}