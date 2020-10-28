import * as Playground from "../playground"
import * as Project from "@/models/project"

export async function create_project(
  project: Project.Project
): Promise<string> {
  const respond = await fetch("api/project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(Project.build(project)),
  })
  return await respond.json()
}
