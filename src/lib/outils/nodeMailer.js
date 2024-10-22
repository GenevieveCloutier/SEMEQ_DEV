//Fichier de gestion pour nodemailer
//fonctionne pour le moment sur localhost
//a modifier avec les informations définitives pour le déploiement

import nodemailer from 'nodemailer';

// Créer un transporteur
const transporteur = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testsemeq@gmail.com', //!J'ai créé une adresse bidon pour les tests
        pass: 'enet kskx ogat sbqz',
    },
});

export async function envoieCourriel(to, subject, html) {
    const options = {
        from: 'testsemeq@gmail.com',
        to,
        subject,
        html,
    };
    try {
        await transporteur.sendMail(options);
        console.log('Courriel envoyé avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'envoi du courriel :', error);
    }
}
