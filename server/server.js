const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const cors = require("cors");
const schema=require('./app/schema/index')
const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
      schema: schema,
      rootValue: schema.query,
      graphiql: true
  })
);



// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Graphql Server Tutorial Crud" });
});



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
