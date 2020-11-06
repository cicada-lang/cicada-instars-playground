const config = require("../../config")
const logger = require("../../logger")
const db = require("../../db")

async function create(data) {
  return await db.call_with_database(config.db_name, async (database) => {
    const found = await database
      .collection(config.collection_name)
      .findOne(data)

    if (found) {
      logger.info({
        msg: "[services.project.create] found old data",
        project_id: found._id,
      })
    }

    if (found) {
      return found._id
    }

    const result = await database
      .collection(config.collection_name)
      .insertOne(data)

    logger.info({
      msg: "[services.project.create] create new data",
      project_id: result.insertedId,
    })

    return result.insertedId
  })
}

module.exports = {
  create,
}
