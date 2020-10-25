import * as Playground from "../playground"

export function init_input(lang: string): string {
  return require(`@/examples/${lang}/welcome.cic`)
}

export function runner(lang: string): (text: string) => string {
  switch (lang) {
    case "lang0":
      return Playground.run_lang0
    case "lang1":
      return Playground.run_lang1
    case "lang2":
      return Playground.run_lang2
    case "lang3":
      return Playground.run_lang3
    default:
      throw new Error(`unknown lang: ${lang}`)
  }
}
