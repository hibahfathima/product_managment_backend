const mongoose = require('mongoose')
const connectionString = process.env.DATABASE_URL
mongoose.connect(connectionString).then((res) => {
    console.log("Data base connected successfully")
}).catch((err) => {
    console.log("Data base connection failed due to " + err)
})