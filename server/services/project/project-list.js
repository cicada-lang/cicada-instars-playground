const config = require("../../config")
const logger = require("../../logger")
const db = require("../../db")

module.exports.list = async () => {
  return await db.call_with_database(config.db_name, async (database) => {
    const list = await database
      .collection(config.collection_name)
      .find()
      .toArray()

    logger.info({
      msg: "[services.project.list]",
      length: list.length,
    })

    return list
  })
}
