<script lang="ts">
  import { flip } from "svelte/animate";
  import * as Post from "./post.remote";

  async function handleCreatePost() {
    const content = prompt("content");
    if (content) {
      await Post.create(content).updates(Post.list());
    }
  }

  async function handleAddLike(postId: string) {
    await Post.addLike(postId).updates(
      Post.list().withOverride((posts) =>
        posts.map((p) => (p.id === postId ? { ...p, like: p.like + 1 } : p)),
      ),
    );
  }

  async function handleDelete(postId: string) {
    if (confirm("Confirm Delete Post")) {
      await Post._delete(postId).updates(
        Post.list().withOverride((posts) =>
          posts.filter((p) => p.id !== postId),
        ),
      );
    }
  }
</script>

<div class="prose">
  <h2>
    Post
    <button class="btn btn-primary btn-sm" onclick={handleCreatePost}>
      Create Post
    </button>
  </h2>
</div>

<svelte:boundary>
  {#snippet failed(error, reset)}
    <button onclick={reset}>oops! try again</button>
  {/snippet}
  {#snippet pending()}
    <p class="opacity-50 mt-4">Loading...</p>
  {/snippet}
  <ul class="mt-4">
    {#each await Post.list() as post (post.id)}
      <li animate:flip={{ duration: 1000 }} data-post-id={post.id} class="pb-2">
        <div class="bg-base-100 p-4 rounded">
          <!-- TODO: this might unsafe for inject script -->
          <div class="whitespace-pre-wrap text-xs">{@html post.content}</div>
          <div class="flex mt-2 gap-2">
            <button
              class="btn btn-xs btn-secondary"
              onclick={() => handleAddLike(post.id)}
            >
              like {post.like}
            </button>
            <button class="btn btn-xs" onclick={() => handleDelete(post.id)}>
              delete
            </button>
          </div>
        </div>
      </li>
    {:else}
      <li class="opacity-50">Empty feed. 😭</li>
    {/each}
  </ul>
</svelte:boundary>
