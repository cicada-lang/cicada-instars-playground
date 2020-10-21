const { MongoClient } = require("mongodb")
const process = require("process")

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = {
  client,
}
