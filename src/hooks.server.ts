import type { Handle } from "@sveltejs/kit";
import PocketBase from "pocketbase";
import { env } from "$env/dynamic/private";

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase(env.POCKETBASE_URL);
    return resolve(event);
};
