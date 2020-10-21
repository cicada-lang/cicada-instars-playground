const services = require("../services")

module.exports = async (request, response) => {
  if (request.method === "GET") get(request, response)
  else if (request.method === "POST") post(request, response)
  else response.json("TODO")
}

const get = async (request, response) => {
  response.json(await services.project.list())
}

const post = async (request, response) => {
  response.json(await services.project.create(request.body))
}
