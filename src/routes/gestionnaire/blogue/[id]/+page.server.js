import { findOne } from '../../../../lib/db/controllers/Blogs.controller';

export async function load({cookies, params}) {
    const blogue = await findOne({id: params.id});
    return {blogue};
}