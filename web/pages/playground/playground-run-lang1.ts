import { pt, lang1, Trace } from "@cicada-lang/cicada"

export function run_lang1(text: string): string {
  try {
    const stmts = lang1.Syntax.parse_stmts(text)
    const ctx = lang1.Ctx.init()
    const env = lang1.Env.init()
    return lang1.Stmt.run(ctx, env, stmts)
  } catch (error) {
    if (error instanceof Trace.Trace) {
      const trace = error
      return Trace.repr(trace, lang1.Exp.repr)
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
