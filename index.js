const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { buildSchema } = require("graphql");
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

const schema = buildSchema(`
  type Product {
    id: ID!
    name: String!
    description: String!
    image_url: String!
    category: String!
    price_in_cents: Int!
    sales: Int!
    created_at: String!
  }

  type Query {
    products: [Product!]!
  }
`);

const root = {
  products: () => allProducts,
};

const app = express();

app.use(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`
  );
});
