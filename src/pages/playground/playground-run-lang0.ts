import { pt, lang0, Trace } from "@xieyuheng/cicada"

export function run_lang0(text: string): string {
  try {
    const stmts = lang0.frontend.parse_stmts(text)
    const env = lang0.Env.init()
    return lang0.Stmt.run(env, stmts)
  } catch (error) {
    if (error instanceof Trace.Trace) {
      const trace = error
      return Trace.repr(trace, lang0.Exp.repr)
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
