<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<div class="container">
	<h1>{data.post?.title}</h1>
	<h5 style="text-align: right;">- {data.post?.author.username}</h5>
	<h6>{data.post?.createdAt}</h6>
	<p>{data.post?.content}</p>

	<div>
		{#if form?.likePost?.message}
			<p>{form.likePost.message}</p>
		{/if}
		<form method="post" action={`?/likePost&postId=${data.post?.id}`} use:enhance>
			<button type="submit">{data.post?.likes.length} Like</button>
		</form>
	</div>

	<div>
		<h4>Comments</h4>
		{#if form?.createComment?.message}
			<p>{form.createComment.message}</p>
		{/if}
		<div>
			<form method="post" action="?/createComment" use:enhance>
				<input type="hidden" name="postId" value={data.post?.id} />
				<input
					name="comment"
					id="comment"
					type="text"
					placeholder="add a comment"
					value={form?.createComment?.comment ?? ''}
				/>
				<button type="submit">Comment</button>
			</form>
		</div>
		{#if data.comments.length}
			<ul>
				{#each data.comments as comment}
					<li>
						<p style="font-weight: bold;">{comment.user.username}</p>
						<p>{comment.comment}</p>
					</li>
				{/each}
			</ul>
		{:else}
			<p>No comments</p>
		{/if}
	</div>
</div>

<style>
	.container {
		max-width: 540px;
		margin: 0 auto;
	}
</style>
