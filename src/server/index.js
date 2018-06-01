import express from 'express'
import bodyParser from 'body-parser'
import expressPlayground from 'graphql-playground-middleware-express';
import { graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `

type Query {
    hello: String
    characters: [Character!]
}

schema {
    query: Query
}

type Character {
    name: String!
  }    
`;

const resolvers = {
    Query: {
        hello(root) {
            return 'Hello World';
        },

        characters(obj, args, context, info) {

            console.log('obj', obj);
            console.log('args', args);
            console.log('context', context);
            console.log('info', info);

            return [{name: 'bill'}];
        }

    },
}

export const myGraphQLSchema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });
  

// ... define or import your schema here!



async function startServer(port, db) {

    const app = express()

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));

    app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

    app.listen(port, () => {
    console.log(`HTTP/GraphQL server listening on port ${port}`);

   });

}

(async () => {

    await startServer(1337, {mydb:'asdf'})


})();
