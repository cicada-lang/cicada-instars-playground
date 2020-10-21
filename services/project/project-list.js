const db = require("../../db")

async function list() {
  return await db.call_with_database("book", async (database) => {
    return await database.collection("towns").find().toArray()
  })
}

module.exports = {
  list,
}
