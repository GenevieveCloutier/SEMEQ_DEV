import { findOne } from '../../../../lib/db/controllers/Partenaires.controller.js';
import { findAll } from '../../../../lib/db/controllers/Categories.controller';

export async function load({params}) {
    const categories = await findAll();
    const code = await findOne({id : params.id});
    if (code.expiration) {
        code.expiration = code.expiration.toLocaleDateString('fr-CA', {timeZone: 'UTC'});
    }
    return {code, categories};
}