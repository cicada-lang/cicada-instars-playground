import * as Playground from "../playground"
import * as Project from "@/models/project"

export async function get_project(
  project_id: string
): Promise<null | Project.Project> {
  const respond = await fetch(`api/project/${project_id}`)
  const result = await respond.json()
  if (result) return Project.build(result)
  else return null
}
