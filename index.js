const express = require("express");
const colors = require("colors");
const cors = require("cors");
// config method
require("dotenv").config();
const schema = require("./schema/schema");
const connectDB = require("./config/db");

//connect to database
connectDB();
// graphql http
const { graphqlHTTP } = require("express-graphql");

const port = process.env.PORT || 5000;

// listen on a port
const app = express();

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log(`Server running on ${port}`));
