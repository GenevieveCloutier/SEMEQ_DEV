<script>
    import { onMount } from 'svelte';
    
    onMount(()=>{
        const actives = document.querySelectorAll('a.is-active');
        actives.forEach((x)=>x.classList.remove('is-active'));
    document.getElementById('utilisateurs').classList.add('is-active')
    });
</script>