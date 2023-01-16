const { projects, clients } = require("../sampleData.js");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require("graphql");

//Mongoose models
const Client = require('../models/Client');
const Project = require('../models/Project');

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  })
});

// Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) { 
        return clients.findById(parent.clientId);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: { 
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID }, clientId: { type: GraphQLID }},
      resolve(parent, args) { 
        console.log("ARGS", args);
        //return projects.find(project => project.id === args.id || project.clientId === args.clientId);
        return Project.findById(args.id);
      }
    }
  },
  clients: { 
    type: new GraphQLList(ClientType),
    resolve(parent, args) {
      return Client.find();
    }
  },
  client: {
    type: ClientType,
    args: { id: { type: GraphQLID }},
    resolve(parent, args) { 
      console.log("CALLED")
      //return clients.find(client => client.id === args.id);
      return Client.findById(args.id);
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});