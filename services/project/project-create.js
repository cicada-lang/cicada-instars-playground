const db = require("../../db")

async function create(document) {
  return await db.call_with_database("book", async (database) => {
    const result = await database.collection("towns").insertOne(document)
    console.log("[create]", result.insertedId)
    return result.insertedId
  })
}

module.exports = {
  create,
}
