import { command, getRequestEvent, query } from "$app/server";
import { string } from "valibot";
import { Mutex } from "async-mutex";

interface Post {
    id: string;
    content: string;
    like: number;
    created: string;
    updated: string;
}

const pb = {
    get posts() {
        const {
            locals: { pb },
        } = getRequestEvent();

        return pb.collection<Post>("posts");
    },
};

export const list = query(() =>
    pb.posts.getFullList({
        sort: "-created",
    }),
);

export const create = command(
    string(), //
    async (str_content) =>
        pb.posts.create({
            content: str_content,
            like: 0,
        } satisfies Partial<Post>),
);

const mutex = new Mutex();
export const addLike = command(
    string(), //
    async (id) =>
        mutex.runExclusive(async () => {
            const post = await pb.posts.getOne(id);
            return pb.posts.update(id, {
                like: post.like + 1,
            });
        }),
);

export const _delete = command(
    string(), //
    async (id) => pb.posts.delete(id),
);
