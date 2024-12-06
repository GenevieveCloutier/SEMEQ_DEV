import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        alias: {
            $api: 'src/routes/api',
            $routes: 'src/routes',
        },
        // 
        adapter: adapter({
            out: 'build', 
        }),
    },
};

export default config;

