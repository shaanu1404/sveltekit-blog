import { db } from "$lib/database";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const posts = await db.post.findMany({
        include: {
            author: { select: { username: true } }
        }
    })
    return { posts }
};