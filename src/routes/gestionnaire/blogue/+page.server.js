import { findAll } from '../../../lib/db/controllers/Blogs.controller';

export async function load({cookies}) {
    const blogues = await findAll();
    return { blogues };
}