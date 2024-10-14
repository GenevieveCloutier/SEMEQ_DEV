export let DEBUG_MODE = false;

export function log(message, objet) {
    if (DEBUG_MODE) {
        console.log(message);
        console.log(objet);
    }
}
