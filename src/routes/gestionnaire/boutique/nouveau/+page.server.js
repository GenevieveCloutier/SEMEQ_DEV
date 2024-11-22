
import { findAll } from '../../../../lib/db/controllers/Types.controller';

export async function load({params}) {
    const types = await findAll();
    return {types};
}