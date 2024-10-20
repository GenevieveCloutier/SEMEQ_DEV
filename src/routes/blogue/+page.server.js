import { findAll, nouveauBillet } from '../../lib/db/controllers/Blogs.controller.js';
import { log } from "$lib/outils/debug.js";

export async function load({cookies, params}){

    let blogues = await findAll();
    
    blogues.forEach(x => {
        x.image_1 = x.image_1.replace(/\\/g, '/');
      });
    log("blogues = ", blogues);
    return { blogues };
}












//* ca c'etait juste pour creer des article dans la bd
// await nouveauBillet(
//     "Comment éviter les fraudes lors de l'inscription à des marchés d'artisans : Quelques conseils pratiques\r\n",
//     "Le monde de l'artisanat est une communauté bienveillante, mais malheureusement, certaines personnes mal intentionnées tentent d'en profiter. De plus en plus d'artisanes rapportent des situations où elles ont été victimes de fraude en s'inscrivant à des marchés qui, en réalité, n’existaient pas. Pour éviter ce genre de piège, il est essentiel de connaître les bons réflexes pour se prémunir le plus possible contre les fraudes. Voici quelques conseils pour vous protéger et sécuriser vos inscriptions.\r\n" +
//   '\r\n' +
//   ' \r\n' +
//   '\r\n' +
//   '1. Vérifiez les réseaux sociaux de la personne qui vous contacte :\r\n' +
//   '\r\n' +
//   "Lorsque quelqu'un vous propose de participer à un marché, faites une recherche sur ses réseaux sociaux. Si son profil est vide, sans ami, ni publication, cela devrait éveiller des soupçons. Un vrai organisateur aura souvent une présence active sur les réseaux et sera lié à une communauté. Ne vous fiez pas uniquement à un logo ou un nom – prenez le temps d'explorer son profil personnel et professionnel.\r\n" +
//   '\r\n' +
//   ' \r\n' +
//   '\r\n' +
//   '2. Ne payez pas par Interac sans garantie :\r\n' +
//   '\r\n' +
//   "Les paiements par Interac ne sont pas protégés en cas de fraude, car vous ne pouvez pas vous opposer au paiement ou profiter de l’assurance qui vient avec un achat par carte de crédit. Si quelqu'un exige ce mode de paiement sans alternative, cela peut être un signal d'alarme. Il est plus sûr d'effectuer le paiement via un site sécurisé comme Square ou de demander une facture officielle avant de payer. Cela vous offre une trace formelle et un recours en cas de problème.\r\n" +
//   '\r\n' +
//   ' \r\n' +
//   '\r\n' +
//   "3. Refus d'émettre une facture ? C'est un mauvais signe :\r\n" +
//   '\r\n' +
//   'Un organisateur sérieux sera toujours prêt à émettre une facture puisqu’il en a l’obligation légale. Si la personne refuse ou vous pousse à payer rapidement sans en fournir une, méfiez-vous. Une facture officielle est non seulement un gage de professionnalisme, mais elle vous permet aussi de prouver que vous avez payé pour un service ou un événement.\r\n' +
//   '\r\n' +
//   ' \r\n' +
//   '\r\n' +
//   "4. Vérifiez l'authenticité de l'événement :\r\n" +
//   '\r\n' +
//   "Assurez-vous que l'événement existe bel et bien. Rendez-vous sur le site officiel du marché ou sur leurs pages sociales pour comparer les prix et les dates d'appel à candidatures. Si ce que l'on vous propose diffère des informations publiques, il se pourrait que ce soit une arnaque. Prenez également le temps de vérifier s'il existe une annonce pour le marché à la date indiquée.\r\n" +
//   '\r\n' +
//   ' \r\n' +
//   '\r\n' +
//   "5. Vérifiez l'inscription de l'organisateur au registre des entreprises :\r\n" +
//   '\r\n' +
//   "Les marchés, où l’organisateur n’œuvre pas sous son nom complet, doivent être inscrits au registre des entreprises et plusieurs, surtout ceux organisant plusieurs marchés devraient avoir un numéro de TPS et TVQ. Faites le calcul pour savoir si on devrait vous charger les taxes et si on ne vous les charges pas restez vigilant. Si vous avez des doutes, faites une recherche rapide dans le registre des entreprises pour vérifier si le nom de l'organisateur correspond à celui de la personne qui vous a contactée.\r\n" +
//   '\r\n' +
//   ' \r\n' +
//   '\r\n' +
//   '6. Consultez les autres artisans :\r\n' +
//   '\r\n' +
//   "Le bouche-à-oreille est souvent votre meilleur allié. Si vous avez des doutes sur un marché ou un organisateur, parlez-en à d'autres artisanes qui ont déjà participé à l'événement. Elles pourront vous donner un aperçu de leur expérience et confirmer si elles traitent avec la même personne que vous.\r\n" +
//   '\r\n' +
//   ' \r\n' +
//   '\r\n' +
//   "En conclusion, la fraude est malheureusement de plus en plus courante dans le monde de l'artisanat, mais en prenant quelques précautions simples, vous pouvez vous protéger et éviter de tomber dans ces pièges. Vérifiez toujours l'identité de la personne qui vous contacte, exigez des preuves tangibles et des documents officiels, et n'hésitez pas à demander des avis auprès de votre réseau d'artisanes.\r\n" +
//   '\r\n' +
//   ' \r\n' +
//   '\r\n' +
//   'En restant vigilante, vous pourrez vous concentrer sur ce que vous faites de mieux : créer !',
//   "src\\lib\\img\\app\\utilisateurs\\poterie.jpg",
//   "src\\lib\\img\\app\\utilisateurs\\poterie.jpg"
// )



