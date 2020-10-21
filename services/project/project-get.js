const db = require("../../db")
const { ObjectID } = require("mongodb")

async function get(project_id) {
  return await db.call_with_database("book", async (database) => {
    return await database
      .collection("towns")
      .findOne({ _id: new ObjectID(project_id) })
  })
}

module.exports = {
  get,
}
