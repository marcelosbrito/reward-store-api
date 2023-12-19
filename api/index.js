// import { ApolloServer, gql } from "apollo-server-express";
// import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
// import http from "http";
// import express from "express";
// import cors from "cors";

// const app = express();

// app.use(cors());
// app.use(express.json());

// const httpServer = http.createServer(app);

// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

// const resolvers = {
//   Query: {
//     hello: () => "world",
//   },
// };

// const startApolloServer = async(app, httpServer) => {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//   });

//   await server.start();
//   server.applyMiddleware({ app });
// }

// startApolloServer(app, httpServer);

// export default httpServer;

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs, resolvers } from "./schema";

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),

  listen: { port: 4000 },
});

console.log(`🚀  Server ready at ${url}`);
