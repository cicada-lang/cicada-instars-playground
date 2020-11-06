const config = require("../../config")
const logger = require("../../logger")
const db = require("../../db")
const cya = require("@forchange/cleword-yaml")
const schema = require("../../../schema/project.schema.json")

async function create(data) {
  const report = cya.Detector.from_present({}, schema).detect(data)

  if (report) {
    logger.info({
      msg: "[services.project.create] invalid data",
      data,
      report,
    })

    return {
      error: { msg: "invalid data", report },
    }
  }

  return await db.call_with_database(config.db_name, async (database) => {
    const found = await database
      .collection(config.collection_name)
      .findOne(data)

    if (found) {
      logger.info({
        msg: "[services.project.create] found old data",
        project_id: found._id,
      })
    }

    if (found) {
      return found._id
    }

    const result = await database
      .collection(config.collection_name)
      .insertOne(data)

    logger.info({
      msg: "[services.project.create] create new data",
      project_id: result.insertedId,
    })

    return {
      data: result.insertedId,
    }
  })
}

module.exports = {
  create,
}
