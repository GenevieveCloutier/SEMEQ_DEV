const DEBUG_MODE = true; // Change à false pour désactiver

export function log(message, objet) {
    if (DEBUG_MODE) {
        console.log(message);
        console.log(objet);
    }
}