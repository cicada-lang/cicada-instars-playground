import { pt, lang2, Trace } from "@cicada-lang/cicada"

export function run_lang2(text: string): string {
  try {
    const stmts = lang2.frontend.parse_stmts(text)
    const ctx = lang2.Ctx.init()
    const env = lang2.Env.init()
    return lang2.Stmt.run(ctx, env, stmts)
  } catch (error) {
    if (error instanceof Trace.Trace) {
      const trace = error
      return Trace.repr(trace, lang2.Exp.repr)
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
