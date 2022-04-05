const graphql = require("graphql");

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
exports.tutorialType = new GraphQLObjectType({
  name: "Tutorials",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    published: { type: GraphQLBoolean },
  }),
});
