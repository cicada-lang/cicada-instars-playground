import * as Playground from "../playground"
import * as Project from "@/models/project"
import * as ut from "@/ut"

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
  const { error, data } = await respond.json()
  if (error) {
    console.error(error)
  }
  return data
}
