const config = require("../../config")
const db = require("../../db")

module.exports.list = async () => {
  return await db.call_with_database(config.db_name, async (database) => {
    return await database.collection(config.collection_name).find().toArray()
  })
}
