const config = require("../../config")
const logger = require("../../logger")
const db = require("../../db")

async function create(document) {
  return await db.call_with_database(config.db_name, async (database) => {
    const found = await database
      .collection(config.collection_name)
      .findOne(document)
    if (found) {
      logger.info({
        msg: "[services.project.create] found old document",
        project_id: found._id,
      })
      return found._id
    } else {
      const result = await database
        .collection(config.collection_name)
        .insertOne(document)
      logger.info({
        msg: "[services.project.create] create new document",
        project_id: result.insertedId,
      })
      return result.insertedId
    }
  })
}

module.exports = {
  create,
}
