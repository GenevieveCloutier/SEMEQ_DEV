import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        // Les alias sont corrects ici
        alias: {
            $api: 'src/routes/api',
            $routes: 'src/routes',
        },
        // L'adaptateur est défini ici, en dehors de "alias"
        adapter: adapter({
            out: 'build', // Dossier de sortie pour les fichiers générés
        }),
    },
};

export default config;

