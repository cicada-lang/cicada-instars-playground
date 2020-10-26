const { ObjectID } = require("mongodb")
const config = require("../../config")
const logger = require("../../logger")
const db = require("../../db")

async function get(project_id) {
  return await db.call_with_database(config.db_name, async (database) => {
    logger.info({
      msg: "[services.project.get]",
      project_id,
    })
    return await database
      .collection(config.collection_name)
      .findOne({ _id: new ObjectID(project_id) })
  })
}

module.exports = {
  get,
}
