import fs from 'fs';

const fichier = 'src/lib/outils/debug.js';
const argv = process.argv.slice(2);
const option = argv[0] === '-on' ? 'true' : argv[0] === '-off' ? 'false' : 'false';

try {
    let contenu = await fs.promises.readFile(fichier, 'utf-8');
    if (argv[0] === '-on')
        contenu = contenu.replace(/const DEBUG_MODE = false;/g, "const DEBUG_MODE = true;");
    else if (argv[0] === '-off')
        contenu = contenu.replace(/const DEBUG_MODE = true;/g, "const DEBUG_MODE = false;");
    else
        console.log('Option non reconnue.\n-- -on pour activer\n-- -off pour désactiver.');
        
    await fs.promises.writeFile(fichier, contenu, 'utf-8');
} catch (error) {
    console.error('Une erreur est survenue :', error);
}