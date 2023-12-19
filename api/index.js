import { ApolloServer } from "@apollo/server";
import gql from "graphql-tag";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";

const app = express();
const httpServer = http.createServer(app);
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

const faker = require("faker");

const TOTAL_PAGES = 5;

const baseProducts = [
  {
    name: "Rustic Ceramic Mug",
    description: faker.lorem.paragraph(),
    image_url:
      "https://storage.googleapis.com/xesque-dev/challenge-images/caneca-06.jpg",
    category: "mugs",
  },
  {
    name: "T-shirt not today.",
    description: faker.lorem.paragraph(),
    image_url:
      "https://storage.googleapis.com/xesque-dev/challenge-images/camiseta-05.jpg",
    category: "t-shirts",
  },
  {
    name: "Mug Black Ring",
    description: faker.lorem.paragraph(),
    image_url:
      "https://storage.googleapis.com/xesque-dev/challenge-images/caneca-04.jpg",
    category: "mugs",
  },
  {
    name: "T-shirt Broken Saints",
    description: faker.lorem.paragraph(),
    image_url:
      "https://storage.googleapis.com/xesque-dev/challenge-images/camiseta-03.jpg",
    category: "t-shirts",
  },
  {
    name: "T-shirt Outcast",
    description: faker.lorem.paragraph(),
    image_url:
      "https://storage.googleapis.com/xesque-dev/challenge-images/camiseta-06.jpg",
    category: "t-shirts",
  },
  {
    name: "Mug The Grounds",
    description: faker.lorem.paragraph(),
    image_url:
      "https://storage.googleapis.com/xesque-dev/challenge-images/caneca-05.jpg",
    category: "mugs",
  },
  {
    name: "T-shirt evening",
    description: faker.lorem.paragraph(),
    image_url:
      "https://storage.googleapis.com/xesque-dev/challenge-images/camiseta-02.jpg",
    category: "t-shirts",
  },
  {
    name: "Matte Black Mug",
    description: faker.lorem.paragraph(),
    image_url:
      "https://storage.googleapis.com/xesque-dev/challenge-images/caneca-01.jpg",
    category: "mugs",
  },
  {
    name: "Mug Never Settle",
    description: faker.lorem.paragraph(),
    image_url:
      "https://storage.googleapis.com/xesque-dev/challenge-images/caneca-03.jpg",
    category: "mugs",
  },
  {
    name: "T-shirt DREAMER",
    description: faker.lorem.paragraph(),
    image_url:
      "https://storage.googleapis.com/xesque-dev/challenge-images/camiseta-01.jpg",
    category: "t-shirts",
  },
  {
    name: "Mug Decaf! P&Co",
    description: faker.lorem.paragraph(),
    image_url:
      "https://storage.googleapis.com/xesque-dev/challenge-images/caneca-02.jpg",
    category: "mugs",
  },
  {
    name: "T-shirt Ramones",
    description: faker.lorem.paragraph(),
    image_url:
      "https://storage.googleapis.com/xesque-dev/challenge-images/camiseta-04.jpg",
    category: "t-shirts",
  },
];

const allProducts = new Array(TOTAL_PAGES).fill(1).reduce((acc) => {
  const products = baseProducts
    .map((product) => ({
      ...product,
      id: faker.datatype.uuid(),
      price_in_cents: faker.datatype.number({
        min: 2000,
        max: 10000,
      }),
      sales: faker.datatype.number(40),
      created_at: faker.date.past(),
    }))
    .sort(() => 0.5 - Math.random());

  return [...acc, ...products];
}, []);

module.exports = {
  products: allProducts,
};

const startApolloServer = async (app, httpServer) => {
  const server = new ApolloServer({
    // typeDefs,
    // resolvers,
    allProducts,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  expressMiddleware(server, { app });
  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, { app })
  );
};

startApolloServer(app, httpServer);
export default httpServer;
