<script lang="ts">
  import type { PageProps } from "./$types";
  import { getQuote, setQuote } from "./api.remote";

  const { data }: PageProps = $props();
  async function updateQuote() {
    const quote = prompt("New Quote");
    if (!quote) return;
    await setQuote(quote);
  }

  const q = await getQuote();
</script>

<section class="prose container px-4 py-6">
  <h1>Caddy Webdav</h1>

  <p>เวลาจาก server {data.now.toLocaleString()}</p>

  <div class="relative">
    {#key "x"}
      {@const q = await getQuote()}
      <blockquote>
        {q.text}<br />
        <time class="block text-xs mt-1">เมื่อ {q.time.toLocaleString()}</time>
        <button
          class="btn btn-primary btn-xs mt-2"
          aria-label="Update Quote"
          onclick={updateQuote}>Update Quote</button
        >
      </blockquote>
    {/key}
  </div>

  <ul>
    <li>
      <a href="/" data-sveltekit-reload>Website</a>
    </li>
    <li>
      <a href="/_" data-sveltekit-reload>Pocketbase</a>
    </li>
    <li>
      <a href="/browse" data-sveltekit-reload>Browse</a>
    </li>
    <li>
      <a href="/webdav" data-sveltekit-reload>Webdav (NOT SUPPORT IN BROWSER)</a
      >
    </li>
  </ul>
</section>
