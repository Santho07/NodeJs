const MongoClient = require('mongodb')
const assert = require('assert')

const url = 'mongodb://localhost:27017'
const dbname = 'confusion'

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null) //checks error is null

  console.log('Connected to MongoDb')
  const db = client.db(dbname)

  const dboper = require('./operations')

  dboper.insertDocument(db, { name: 'Vadonut', description: 'Test' }, 'dishes', (result) => {
    console.log('Insert Document:\n', result.ops)

    dboper.findDocuments(db, 'dishes', (docs) => {
      console.log('Found Documents:\n', docs)

      dboper.updateDocument( db, { name: 'Vadonut' }, { description: 'Updated Test' }, 'dishes', (result) => {
          console.log('Updated Document:\n', result.result)

          dboper.findDocuments(db, 'dishes', (docs) => {
            console.log('Found Updated Documents:\n', docs)

            db.dropCollection('dishes', (result) => {
              console.log('Dropped Collection: ', result)

              client.close()
            })
          })
        }
      )
    })
  })
})
