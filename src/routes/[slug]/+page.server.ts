import { db } from "$lib/database";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

async function getPost(slug: string) {
    return await db.post.findFirst({
        where: { slug: { contains: slug } },
        include: {
            author: { select: { username: true } },
            likes: { select: { id: true } },
        }
    })
}

async function getComments(slug: string) {
    return await db.comment.findMany({
        where: { post: { slug: { contains: slug } } },
        select: {
            comment: true,
            user: { select: { username: true } }
        }
    })
}

export const load: PageServerLoad = async ({ params }) => {
    return {
        post: getPost(params.slug),
        comments: getComments(params.slug)
    }
};

export const actions: Actions = {
    likePost: async ({ url }) => {
        const postId = url.searchParams.get('postId')
        const like = await db.like.findFirst({
            where: { AND: { postId: +postId!, userId: 1 } },
        })
        if (like) {
            await db.like.delete({ where: { id: like.id } })
            return { likePost: { message: 'Post disliked' } }
        } else {
            await db.like.create({
                data: { postId: +postId!, userId: 1 }
            })
            return { likePost: { message: 'Post liked' } }
        }
    },
    createComment: async ({ request }) => {
        const formdata = await request.formData()
        const comment = formdata.get('comment')?.toString()
        const postId = formdata.get('postId')
        if (!comment?.trim()) {
            return fail(400, {
                createComment: { comment, message: 'Comment is required' }
            })
        }

        try {
            await db.comment.create({
                data: {
                    comment,
                    userId: 1,
                    postId: +postId!
                }
            })
        } catch (error: any) {
            return fail(400, {
                createComment: { comment, message: error.message }
            })
        }
    }
};