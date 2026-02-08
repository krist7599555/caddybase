import { command, getRequestEvent, query } from "$app/server";
import { string } from 'valibot'
import { Mutex } from 'async-mutex'

interface Post {
  id: string
  content: string
  like: number
  created: string
  updated: string
}

const pb = {
  get posts() {
    const { locals: { pb } } = getRequestEvent(); 
    return pb.collection<Post>("posts")
  }
}

export const list = query(() => {
  return pb.posts.getFullList({
  sort: '-created'
  })
})

export const create = command(string(), async (content) => {
  const post = await pb.posts.create({
    content: content,
    like: 0
  } satisfies Partial<Post>)
  return post;
})

const mutex = new Mutex();
export const addLike = command(string(), async (postId) => {
  return await mutex.runExclusive(async () => {
    let post = await pb.posts.getOne(postId);
    let newPost = await pb.posts.update<Post>(postId, {
      like: post.like + 1,
    } satisfies Partial<Post>)
    return newPost;
  });
})

export const _delete = command(string(), async (postId) => {
  let post = await pb.posts.delete(postId);
  return post; 
})