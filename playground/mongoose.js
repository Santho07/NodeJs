const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useUnifiedTopology: true,
  useCreateIndex: true,
})


const me = new User(
  {
    name: "Imam",
    email: 'imam@gmail.com',
    age: 25,
    password: 'abcd123'
  }
)

me.save()
  .then((result) => console.log(result))
  .catch((err) => console.log(err))

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})
  
const task = new Task(
  {
    description: 'Check out courseera'
  }
)


task.save()
  .then((result) => console.log(result))
  .catch((err) => console.log(err))

  console.log("jkjslkfjls ")