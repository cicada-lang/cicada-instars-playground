const services = require("../../server/services")

module.exports = async (request, response) => {
  switch (request.method) {
    case "GET":
      return get(request, response)
    default:
      throw new Error("TODO")
  }
}

const get = async (request, response) => {
  response.json(await services.project.get(request.query.project_id))
}
