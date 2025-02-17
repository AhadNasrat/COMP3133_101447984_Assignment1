const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        if (token) {
            try {
                const user = jwt.verify(token, process.env.JWT_SECRET);
                return { user };
            } catch (error) {
                console.error('Invalid token');
            }
        }
        return {};
    }
});

server.start().then(() => {
    server.applyMiddleware({ app });
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to MongoDB');
        app.listen({ port: process.env.PORT || 4000 }, () => {
            console.log(`Server running at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`);
        });
    }).catch(err => console.error(err));
});

module.exports = app;
