import type { Handle } from "@sveltejs/kit";
import PocketBase from 'pocketbase'
import { env } from '$env/dynamic/private'

export const handle: Handle = async ({ event, resolve }) => {
  const pb = new PocketBase(env.POCKETBASE_URL)
  event.locals.pb = pb;
  return resolve(event);
};
