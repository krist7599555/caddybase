import type { Transport } from "@sveltejs/kit";

export const transport: Transport = {
    Date: {
        encode: (value) => value instanceof Date && [value.toISOString()],
        decode: ([data]) => new Date(data),
    },
};
