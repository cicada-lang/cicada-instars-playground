import { pt, lang3, Trace } from "@xieyuheng/cicada"

export function run(text: string): string {
  try {
    const tops = lang3.frontend.parse_tops(text)
    const mod = lang3.Mod.init()
    return lang3.Top.run(mod, tops)
  } catch (error) {
    if (error instanceof Trace.Trace) {
      const trace = error
      return Trace.repr(trace, lang3.Exp.repr)
    }
    if (error instanceof pt.ParsingError) {
      let message = error.message
      message += "\n"
      message += pt.Span.report(error.span, text)
      return message
    }
    throw error
  }
}
