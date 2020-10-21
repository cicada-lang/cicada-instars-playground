const Srvs = require("../server/services")

module.exports = async (request, response) => {
  if (request.method === "GET") get(request, response)
  else if (request.method === "POST") post(request, response)
  else response.json("TODO")
}

const get = async (request, response) => {
  response.json(await Srvs.Project.list())
}

const post = async (request, response) => {
  response.json(request.body)
}
