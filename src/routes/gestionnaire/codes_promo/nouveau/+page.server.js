import { findAll } from '../../../../lib/db/controllers/Categories.controller';

export async function load({params}) {
    const categories = await findAll();
    return {categories};
}