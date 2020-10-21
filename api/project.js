const services = require("../services")

module.exports = async (request, response) => {
  if (request.method === "GET") get(request, response)
  else if (request.method === "POST") post(request, response)
  else throw new Error("TODO")
}

const get = async (request, response) => {
  if (request.query.project_id) {
    response.json(await services.project.get(request.query.project_id))
  } else {
    response.json(await services.project.list())
  }
}

const post = async (request, response) => {
  response.json(await services.project.create(request.body))
}
