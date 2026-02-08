<script lang="ts">
  import * as Quote from "./quote.remote";

  async function updateQuote() {
    const quote = prompt("New Quote");
    if (!quote) return;
    await Quote.set(quote);
  }
</script>

<div class="relative prose">
  <h2>Quote</h2>
  {#key "x"}
    {@const q = await Quote.get()}
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
