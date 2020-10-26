const { ObjectID } = require("mongodb")
const config = require("../../config")
const logger = require("../../logger")
const db = require("../../db")

async function get(project_id) {
  return await db.call_with_database(config.db_name, async (database) => {
    if (ObjectID.isValid(project_id)) {
      const project = await database
        .collection(config.collection_name)
        .findOne({ _id: new ObjectID(project_id) })
      logger.info({
        msg: "[services.project.get]",
        project_id,
        found_p: Boolean(project),
      })
      return project
    } else {
      logger.info({
        msg: "[services.project.get] invalid project_id",
        project_id,
        found_p: false,
      })
      return null
    }
  })
}

module.exports = {
  get,
}
