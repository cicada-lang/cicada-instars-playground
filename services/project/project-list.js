const db = require("../../db")

module.exports.list = async () => {
  return await db.call_with_database("book", async (database) => {
    return await database.collection("towns").find().toArray()
  })
}
