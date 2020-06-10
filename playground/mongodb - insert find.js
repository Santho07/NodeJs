/* const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID */
const { MongoClient, ObjectID } = require("mongodb")

const id = new ObjectID()
console.log(id, id.id)
console.log(id.getTimestamp())

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.log(error)
  }
  const db = client.db(databaseName)

/*   db.collection("users").insertMany(
    [
      {
        name: "Jenny",
        age: 21,
        shape: "curve",
      },
      {
        name: "Sofia",
        age: 25,
        shape: "shophisticated",
      },
    ],
    (error, result) => {
      if (error) {
        return console.log("Unable to insert documents")
      }
      console.log(result.ops)
    }
  ) */

  /*   db.collection("users").insertOne({
    name: "Imam",
    age: 25,
  })
  console.log("Done!") */
  let taskArr = (() => {
    let arr = []
    for (let i = 1; i <= 5; i++) {
      arr.push({
        name: "Task-1" + i,
        completed: i % 2 === 0,
      })
    }
    return arr
  })()
  db.collection("tasks").insertMany(taskArr, (error, result) => {
      if (error) {
        return console.log("Unable to insert tasks in mongodb")
      }
      console.log(result.ops)
    }
  )

  db.collection("users").findOne({ age: 25 }, (error, result) => {
    console.log(result)
  })
  db.collection("users")
    .find({ age: 25 })
    .count((error, count) => console.log(count))
})
