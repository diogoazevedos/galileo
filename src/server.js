const { merge } = require('lodash');
const { Server } = require('hapi');
const { makeExecutableSchema } = require('graphql-tools');
const { graphqlHapi, graphiqlHapi } = require('graphql-server-hapi');

const server = new Server();

const rootSchema = `
  type Query {
    quote: String
  }

  schema {
    query: Query
  }
`;

const rootResolvers = {
  Query: {
    quote() {
      return 'Simplicity is the ultimate sophistication. - Leonardo da Vinci';
    },
  },
};

const executableSchema = makeExecutableSchema({
  typeDefs: [rootSchema],
  resolvers: merge(rootResolvers),
});

server.connection({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '3000',
});

server.register({
  register: graphqlHapi,
  options: {
    path: '/graphql',
    graphqlOptions: {
      schema: executableSchema,
    },
  },
});

server.register({
  register: graphiqlHapi,
  options: {
    path: '/graphiql',
    graphiqlOptions: {
      endpointURL: '/graphql',
    },
  },
});

module.exports = server;
