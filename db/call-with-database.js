const { MongoClient } = require("mongodb")
const process = require("process")

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
})

const call_with_database = async (db_name, cb) => {
  await client.connect()
  try {
    const result = await cb(client.db(db_name))
    console.error(`[call_with_database] ${db_name}`)
    client.close()
    return result
  } catch (error) {
    console.error(`[call_with_database] [fail] ${db_name}`)
    console.error(error)
    client.close()
  }
}

module.exports = {
  call_with_database,
}
