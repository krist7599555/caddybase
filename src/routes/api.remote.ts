import { command, query } from "$app/server";
import { string, nonEmpty, pipe } from 'valibot'

let quote = {
  time: new Date(),
  text: 'initial quote'
}

export const getQuote = query(() => {
  return quote
})

export const setQuote = command(pipe(string(), nonEmpty()), (newQuote) => {
  quote = {
    time: new Date(),
    text: newQuote
  }
  getQuote().refresh();
})