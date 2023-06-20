<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ article } = data);
</script>

<form action="?/updateArticle" method="POST">
	<h3>Editing: {article.title}</h3>
	<label for="title">Title</label>
	<input type="text" name="title" id="title" value={article.title} />
	<label for="content">Content</label>
	<textarea name="content" id="content" rows={5} value={article.content} />
	<button type="submit">Update Article</button>
</form>
