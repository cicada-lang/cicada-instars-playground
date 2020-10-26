const config = require("../../config")
const db = require("../../db")

async function create(document) {
  return await db.call_with_database(config.db_name, async (database) => {
    const found = await database
      .collection(config.collection_name)
      .findOne(document)
    if (found) {
      console.log("[create] old", found._id)
      return found._id
    } else {
      const result = await database
        .collection(config.collection_name)
        .insertOne(document)
      console.log("[create] new", result.insertedId)
      return result.insertedId
    }
  })
}

module.exports = {
  create,
}
