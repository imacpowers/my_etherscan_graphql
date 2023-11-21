// Import ApolloServer from apollo-server to create a GraphQL server
const { ApolloServer } = require("apollo-server");

// Import schema from schema.graphql file
const { importSchema } = require("graphql-import");
const typeDefs = importSchema("./schema.graphql"); 

// Import custom data source
const EtherDataSource = require("./datasource/ethDatasource");

// Load environment variables from .env file 
require("dotenv").config();

// Define resolvers for Query fields
const resolvers = {
 Query: {
   // Resolver for etherBalanceByAddress field
   etherBalanceByAddress: (root, _args, { dataSources }) => 
     dataSources.ethDataSource.etherBalanceByAddress(),

   // Resolver for totalSupplyOfEther field  
   totalSupplyOfEther: (root, _args, { dataSources }) =>
     dataSources.ethDataSource.totalSupplyOfEther(),

   // Resolver for latestEthereumPrice field
   latestEthereumPrice: (root, _args, { dataSources }) =>  
     dataSources.ethDataSource.getLatestEthereumPrice(),

   // Resolver for blockConfirmationTime field
   blockConfirmationTime: (root, _args, { dataSources }) =>
     dataSources.ethDataSource.getBlockConfirmationTime(),
 },
};

// Create ApolloServer instance
const server = new ApolloServer({
 typeDefs,
 resolvers,
 
 // Pass EtherDataSource instance to dataSources function
 dataSources: () => ({
   ethDataSource: new EtherDataSource(), 
 }),
});

// Disable timeout
server.timeout = 0;

// Start server and log URL
server.listen("9000").then(({ url }) => {
 console.log(`🚀 Server ready at ${url}`);
});