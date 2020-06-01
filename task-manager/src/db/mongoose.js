const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useUnifiedTopology: true,
  useCreateIndex: true,
})

const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  married: {
    type: Boolean,
  },
})
const me = new User({ name: "Imam", age: 25, married: false })

me.save()
  .then((result) => console.log(result))
  .catch((err) => console.log(err))

const Task = mongoose.model("Task", {
  name: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
})

const task = new Task({ name: "task1", completed: false })
task
  .save()
  .then((result) => console.log(result))
  .catch((err) => console.log(err))
