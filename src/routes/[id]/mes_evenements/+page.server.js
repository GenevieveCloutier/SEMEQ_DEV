import { findAllWhere } from '../../../lib/db/controllers/Evenements.controller.js';
import { findOne } from '../../../lib/db/controllers/Utilisateurs.controller.js'; /*  */

export async function load({ cookies }) {
	try {
		let evenements = await findAllWhere({ utilisateur_id: cookies.get('id') });
		const utilisateur = await findOne({ id: cookies.get('id') });
		//*foreach pour ajuster le lien des photos
		evenements.forEach((evenement) => {
			evenement.photo_1 = '../' + evenement.photo_1;
			evenement.photo_2 = evenement.photo_2 ? '../' + evenement.photo_2 : null;
			evenement.photo_3 = evenement.photo_3 ? '../' + evenement.photo_3 : null;
		});
		return { evenements, utilisateur };
	} catch (error) {
		console.log(error);
	}
}
