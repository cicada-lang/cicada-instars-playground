const { MongoClient } = require("mongodb")
const process = require("process")

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const call_with_database = async (dbname, cb) => {
  await client.connect()
  try {
    const result = await cb(client.db(dbname))
    console.error(`[call_with_database] ${dbname}`)
    client.close()
    return result
  } catch (error) {
    console.error(`[call_with_database] [fail] ${dbname}`)
    console.error(error)
    client.close()
  }
}

module.exports = {
  call_with_database,
}
