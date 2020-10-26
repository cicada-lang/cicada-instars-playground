import * as Playground from "../playground"
import * as Project from "@/models/project"

export async function init_project(
  project: Project.Project,
  opts: { query: any; params: any }
): Promise<void> {
  update_project_by_default_project(project)
  update_project_by_local_storage(project, localStorage)
  update_project_by_query(project, opts.query)
  if (opts.params.project_id)
    await update_project_by_project_id(project, opts.params.project_id)
}

function update_project_by_default_project(project: Project.Project): void {
  project.input = Playground.Lang.welcome(project.lang)
}

function update_project_by_query(project: Project.Project, query: any): void {
  if (
    typeof query.lang === "string" &&
    Playground.Lang.supported_langs.includes(query.lang)
  ) {
    project.lang = query.lang
  }

  if (
    typeof query.editor === "string" &&
    Playground.Editor.supported_editors.includes(query.editor)
  ) {
    project.editor = query.editor
  }
}

function update_project_by_local_storage(
  project: Project.Project,
  localStorage: Storage
): void {
  if (localStorage.lang) project.lang = localStorage.lang
  if (localStorage.editor) project.editor = localStorage.editor
  if (localStorage.input) project.input = localStorage.input
  if (localStorage.output) project.output = localStorage.output
}

async function update_project_by_project_id(
  project: Project.Project,
  project_id: string
): Promise<void> {
  project.input = `// Loading project: ${project_id}`
  Object.assign(project, await Playground.get_project(project_id))
}
