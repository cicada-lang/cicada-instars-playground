const services = require("../../server/services")
const logger = require("../../server/logger")
const router = require("../../server/router")

module.exports = router({
  routes: {
    GET: async (request, response) => {
      response.json(await services.project.get(request.query.project_id))
    },
  },
})
