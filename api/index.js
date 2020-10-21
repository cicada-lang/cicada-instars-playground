const { MongoClient } = require("mongodb")
const assert = require("assert")
const process = require("process")
const fs = require("fs")

async function p1() {
  const uri = process.env.MONGODB_URI
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  try {
    await client.connect()
    console.log("Connected successfully to server")
    const db = client.db("book")
    const towns = db.collection("towns")
    const result = await towns.find().toArray()
    return result
  } catch (err) {
    console.log(err.stack)
  }

  client.close()
}

module.exports = async (req, res) => {
  res.json(await p1())
}
