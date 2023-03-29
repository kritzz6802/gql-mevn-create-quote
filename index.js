import { ApolloServer } from 'apollo-server-express';
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageDisabled
} from 'apollo-server-core'
import typeDefs from './schemaGql.js'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import path from 'path';

const port = process.env.PORT || 4000
const app = express();
const httpServer = http.createServer(app);

if(process.env.NODE_ENV!=="production"){
    dotenv.config();

}
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected", () => {
    console.log("connected to mongodb")
})
mongoose.connection.on("error", (err) => {
    console.log("err connecting", err)
});

//import model
import './models/User.js'
import './models/Quotes.js'


import resolvers from './resolvers.js'

//this is middleware for authentication
const context = ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
        return { userId }
    }
}
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [
        [ApolloServerPluginDrainHttpServer({ httpServer })],
        process.env.NODE_ENV!=="production" ?
        ApolloServerPluginLandingPageGraphQLPlayground() :
        ApolloServerPluginLandingPageDisabled
    ]
});


if(process.env.NODE_ENV!=="production"){
app.use(express.static('front-end/dist'))
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'front-end','dist','index.html'))
})
}

await server.start();
server.applyMiddleware({
    app,
    path: '/graphql'
});
httpServer.listen({ port },()=>{
    console.log(`🚀  Server ready at ${server.graphqlPath}`);
});