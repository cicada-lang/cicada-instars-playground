const services = require("../server/services")

module.exports = async (request, response) => {
  switch (request.method) {
    case "GET":
      return get(request, response)
    case "POST":
      return post(request, response)
    default:
      throw new Error("TODO")
  }
}

const get = async (request, response) => {
  response.json(await services.project.list())
}

const post = async (request, response) => {
  response.json(await services.project.create(request.body))
}
