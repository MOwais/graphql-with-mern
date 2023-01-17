require("dotenv").config();
const express = require("express");
const colors = require("colors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const cors = require("cors");

const port = process.env.PORT || 5000;

const app = express();

//connect to database
connectDB();

app.use(cors());

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === "development",
}));

app.listen(port, console.log(`server running on port ${port}`));

