const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");

  // res.json({ message: "Welcome to Anil Portfolio" });
});

require("./app/routes/app.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// var express = require("express");
// const mongoose = require("mongoose");
// const URI =
//   "mongodb+srv://anilreddya:Ravi$417@cluster0.ig3bg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// const connectDb = async () => {
//   await mongoose.connect(URI, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   });
//   console.log("connected");
// };
// connectDb();
// var app = express();
// app.get("/", function (req, res) {
//   res.send("Hello World!");
// });
// const port = process.env.PORT || 3000;
// app.listen(port, function () {
//   console.log("Example app listening on port 3000!");
// });
