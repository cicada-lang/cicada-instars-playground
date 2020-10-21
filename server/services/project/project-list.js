const { client } = require("../../db")

// const dbname = "cicada-playground"
const dbname = "book"

const list = async () => {

  await client.connect()
  console.log("[Srvs.Project.list] connected successfully to server.")
  const db = client.db(dbname)

  try {
    // const projects = db.collection("projects")
    const projects = db.collection("towns")
    const result = await projects.find().toArray()
    return result
  } catch (error) {
    console.error(error.stack)
  }

  client.close()
}

module.exports = {
  list
}
