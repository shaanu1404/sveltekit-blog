import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { createFakeUsers } from "$lib/database/seeders/user";

export const POST: RequestHandler = async ({ url }) => {
    const count = url.searchParams.get('count') ?? 1

    try {
        const users = await createFakeUsers(+count);
        return json({ users }, { status: 201 })
    } catch (error: any) {
        return json({ error: error.message }, { status: 400 })
    }
}