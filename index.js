const express = require("express");
const app = express();
const volleyball = require("volleyball");
const db = require("./db");
const models = require ('./models')
const routes = require ('./routes/index')

// logging middleware
app.use(volleyball);

// parsing middleware
app.use(express.json());

//static
app.use(express.static("build"));

app.use('/api', routes)

app.use("/api", (req, res) => {
  res.sendStatus(404);
});

app.use((req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});


// error middleware -> https://expressjs.com/es/guide/error-handling.html
app.use((err, req, res, next) => {
  console.log("ERROR");
  console.log(err);
  res.status(500).send(err.message);
});

db.sync({ force: false }).then(() => {
  app.listen(3000, () => console.log("Servidor escuchando en el puerto 3000"));
})
.catch(console.error);
