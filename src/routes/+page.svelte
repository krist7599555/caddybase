<script lang="ts">
  import type { PageProps } from "./$types";
  import Post from "./post.svelte";
  import Quote from "./quote.svelte";

  const { data }: PageProps = $props();
</script>

<section class="prose container px-4 py-6">
  <h1>Caddy Webdav</h1>

  <p>เวลาจาก server {data.now.toLocaleString()}</p>

  <ul>
    <li><a href="/" data-sveltekit-reload>Website</a></li>
    <li><a href="/_" data-sveltekit-reload>Pocketbase</a></li>
    <li><a href="/browse" data-sveltekit-reload>Browse</a></li>
    <li>
      <a href="/webdav" data-sveltekit-reload>Webdav (NOT SUPPORT IN BROWSER)</a
      >
    </li>
  </ul>
</section>

<section class="bg-base-200 px-4 py-6">
  <Quote />
</section>

<section class="px-4 py-6 bg-base-300">
  <Post />
</section>
