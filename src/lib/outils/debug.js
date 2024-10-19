const DEBUG_MODE = true;

export function log(message, objet) {
    if (DEBUG_MODE) {
        console.log(message);
        console.log(objet);
    }
}
