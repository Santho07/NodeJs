const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
})


  
// const task = new Task(
//   {
//     description: 'Check out courseera'
//   }
// )


// task.save()
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err))