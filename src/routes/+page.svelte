<script lang="ts">
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
</script>

<h1>Welcome to SvelteKit Hello</h1>
<p>Time from server {data.now}</p>
<p>
  Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
  documentation
</p>
