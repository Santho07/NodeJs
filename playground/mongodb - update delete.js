const { MongoClient, ObjectID } = require('mongodb')

const id = new ObjectID()

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.log(error)
  }
  const db = client.db(databaseName)

  db.collection("tasks").updateMany(
    { name: new RegExp('Task') },
    {
      $set: {
        completed: true,
      },
    }
  ).then(result => console.log(result))
    .catch(error => console.log(error))
  
  db.collection('users').deleteMany({
    age: 25 || ""
  }).then(result => console.log(result))
    .catch(err => console.log(err))
  
})
