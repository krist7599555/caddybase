import { command, query } from "$app/server";
import { string, nonEmpty, pipe } from "valibot";

let quote = {
    time: new Date(),
    text: "initial quote",
};

export const get = query(() => quote);
export const set = command(
    pipe(string(), nonEmpty()), //
    (newQuote) => {
        quote = {
            time: new Date(),
            text: newQuote,
        };
        get().refresh();
    },
);
