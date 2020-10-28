const services = require("../server/services")
const logger = require("../server/logger")
const router = require("../server/router")

module.exports = router({
  routes: {
    GET: async (req, res) => {
      res.json(await services.project.list())
    },
    POST: async (req, res) => {
      res.json(await services.project.create(req.body))
    },
  },
})
