import * as Playground from "../playground"

export type Lang = "lang0" | "lang1" | "lang2" | "lang3"

export const langs = ["lang0", "lang1", "lang2", "lang3"]

export const default_lang = "lang3" as const

export function init_input(lang: Lang): string {
  return require(`@/examples/${lang}/welcome.cic`)
}

export function runner(lang: Lang): (text: string) => string {
  switch (lang) {
    case "lang0":
      return Playground.run_lang0
    case "lang1":
      return Playground.run_lang1
    case "lang2":
      return Playground.run_lang2
    case "lang3":
      return Playground.run_lang3
  }
}
