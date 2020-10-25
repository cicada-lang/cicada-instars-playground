import * as Project from "../project"

export function build(opts: Project.Project): Project.Project {
  return {
    lang: opts.lang,
    editor: opts.editor,
    input: opts.input,
    output: opts.output,
  }
}
