const { MongoClient } = require("mongodb")
const process = require("process")
const logger = require("../logger")

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// NOTE We should not close connection in serverless functions.
//   And we should use `cached_dbs` instead.
const cached_dbs = {}

const call_with_database = async (db_name, cb) => {
  if (cached_dbs[db_name]) {
    logger.info({
      msg: "[db.call_with_database]",
      hit_cache_p: true,
      db_name,
    })
    return await cb(cached_dbs[db_name])
  }

  try {
    await client.connect()
    const db = client.db(db_name)
    cached_dbs[db_name] = db
    logger.info({
      msg: "[db.call_with_database]",
      hit_cache_p: false,
      db_name,
    })
    return await cb(db)
  } catch (error) {
    throw error
  }
}

module.exports = {
  call_with_database,
}
