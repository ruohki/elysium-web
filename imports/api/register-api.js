import { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";

import GeneralSchema from './general/general.graphql';
import GeneralResolvers from './general/resolvers';

const typeDefs = [GeneralSchema];

const resolvers = _.merge(GeneralResolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

createApolloServer({ schema });