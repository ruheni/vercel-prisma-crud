<script lang="ts">
	import '@picocss/pico';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="container">
	<nav>
		<ul>
			<li>
				<strong>
					<a href="/">Paradiso</a>
				</strong>
			</li>
		</ul>
		<ul>
			<li><a href="/">Home</a></li>
			{#if !data.user}
				<li><a href="/register">Register</a></li>
				<li><a href="/login" role="button">Login</a></li>
			{/if}
		</ul>
	</nav>
	<slot />
</div>
