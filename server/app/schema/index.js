const graphql = require("graphql");
const tutorialController = require("../controllers/tutorial.controller");
const { tutorialType } = require("./tutorial.type");
// GraphQL functions
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

// Custom Type

// Root Query

const tutorialInputType = new GraphQLInputObjectType({
  name: "tutorialInputType",
  description: "a tutorial input type",
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    published: { type: GraphQLBoolean },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Query type definition",
  fields: {
    getTutorial: {
      type: new GraphQLList(tutorialType),

      async resolve(parent, args) {
        data = await tutorialController.all();
        console.log(data);
        return data;
      },
    },
  },
});

// Mutations. These will change the data
const Mutations = new GraphQLObjectType({
  name: "Mutations",
  description: "Mutations type definition",
  fields: {
    addUser: {
      type: tutorialType,
      args: {
        input: { type: tutorialInputType },
      },
      async resolve(parent, args) {
        await tutorialController.create(args.input);

        return args.input;
      },
    },
    updateUser: {
      type: tutorialType,

      async resolve(parent, args) {
        const tutorial = await tutorialController.update();

        return args;
      },
    },
  },
});

// Export schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});
