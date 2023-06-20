<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ articles } = data);
</script>

<div class="grid">
	<div>
		<h2>Articles:</h2>
		{#each articles as article}
			<article>
				<header>{article.title}</header>
				<p>{article.content}</p>
				<button class="outline secondary">Delete Article</button>
				<a href="/" class="outline contrast">Edit Article</a>
			</article>
		{/each}
	</div>
	<form action="?/createArticle" method="POST">
		<h3>New Article</h3>
		<label for="title">Title</label>
		<input type="text" name="title" id="title" />
		<label for="content">Content</label>
		<textarea name="content" id="content" rows={5} />
		<button type="submit">Add Article</button>
	</form>
</div>
