import * as Playground from "../playground"
import * as Project from "@/models/project"

export async function initialize_project(
  project: Project.Project,
  query: any
): Promise<void> {
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

  const project_id = project_id_from_query(query)
  if (project_id) {
    project.input = `// Loading project: ${project_id}`
    Object.assign(project, await Playground.get_project(project_id))
  } else {
    project.input = Playground.Lang.welcome(project.lang)
  }
}

function project_id_from_query(query: any): undefined | string {
  return typeof query.project_id === "string" ? query.project_id : undefined
}
