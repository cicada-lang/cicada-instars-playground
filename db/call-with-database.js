const { MongoClient } = require("mongodb")
const process = require("process")

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// NOTE We should not close connection in serverless functions.
//   And we should use `cached_dbs` instead.
const cached_dbs = {}

const call_with_database = async (db_name, cb) => {
  if (cached_dbs[db_name] !== undefined) {
    console.log(`[call_with_database] [cached] ${db_name}`)
    return await cb(cached_dbs[db_name])
  }

  try {
    await client.connect()
    console.log(`[call_with_database] [new connection] ${db_name}`)
    const db = client.db(db_name)
    cached_dbs[db_name] = db
    return await cb(db)
  } catch (error) {
    console.error(`[call_with_database] [fail] ${db_name}`)
    throw error
  }
}

module.exports = {
  call_with_database,
}
