const config = require("../../config")
const db = require("../../db")

async function create(document) {
  return await db.call_with_database(config.db_name, async (database) => {
    const result = await database
      .collection(config.collection_name)
      .insertOne(document)
    console.log("[create]", result.insertedId)
    return result.insertedId
  })
}

module.exports = {
  create,
}
