<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<svelte:boundary
  onerror={(err, reset) => {
    console.error(err);
  }}
>
  {#snippet failed(error, reset)}
    <div role="alert" class="alert alert-error alert-soft">
      {error}
    </div>
    <button onclick={reset}>oops! try again</button>
  {/snippet}
  {@render children()}
</svelte:boundary>
