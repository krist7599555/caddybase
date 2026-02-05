import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        now: Date.now()
    };
}) satisfies PageServerLoad;