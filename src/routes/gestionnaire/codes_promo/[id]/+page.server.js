import { findOne } from '../../../../lib/db/controllers/Partenaires.controller';

export async function load({cookies, params}) {
    const code = await findOne({id: params.id});
    if (code.expiration) {
        code.expiration = code.expiration.toLocaleDateString('fr-CA', {timeZone: 'UTC'});
    }
    return {code};
}