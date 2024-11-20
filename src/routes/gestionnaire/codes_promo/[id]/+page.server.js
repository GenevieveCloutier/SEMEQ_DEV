import { findOne } from '../../../../lib/db/controllers/Partenaires.controller';

export async function load({cookies, params}) {
    const code = await findOne({id: params.id});
    return {code};
}