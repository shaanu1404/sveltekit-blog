<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Blog</h1>

<ul>
	{#each data.posts as post (post.id)}
		<li>
			<h3>
				<a href={`/${post.slug}`}>{post.title} - {post.author.username}</a>
			</h3>
			<h6>{post.createdAt}</h6>
			<p>{post.content}</p>
		</li>
	{/each}
</ul>
