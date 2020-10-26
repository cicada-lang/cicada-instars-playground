const services = require("../../server/services")

module.exports = async (request, response) => {
  if (request.method === "GET") get(request, response)
  else throw new Error("TODO")
}

const get = async (request, response) => {
  response.json(await services.project.get(request.query.project_id))
}
