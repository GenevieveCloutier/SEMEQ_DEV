import { redirect } from '@sveltejs/kit';

export function load ({cookies}){
    const role = cookies.get('role');
    
    if(role != '3')
        redirect(302, '/');
}