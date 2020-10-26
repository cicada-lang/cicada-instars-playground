import * as Playground from "../playground"
import * as Project from "@/models/project"

export async function get_project(
  project_id: string
): Promise<Project.Project> {
  const respond = await fetch(`api/project/${project_id}`)
  const result = await respond.json()
  return Project.build(result)
}
