const mongoose = require("mongoose");

//Mongoose schema is not related to GraphQL Schema

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
  },
  clientId: {
    //when creating a new collection, an objectId is automatically assigned
    type: mongoose.Schema.Types.ObjectId,
    //relate to other model,
    ref: 'Client',
  }
});

module.exports = mongoose.model("Project", ProjectSchema);