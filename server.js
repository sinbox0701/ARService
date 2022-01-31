require('dotenv').config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./User/User.utils";

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (ctx) => {
        if (ctx.req) {
            return {
                loggedInUser: await getUser(ctx.req.headers.token)
            }
        } else {
            const {
                connection: { context }
            } = ctx;
            return {
                loggedInUser: context.loggedInUser
            }
        }
    }
});

const graphqlPORT = process.env.graphqlPORT;
const restPORT = process.env.restPORT;

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true,
    }
});

app.use(logger("tiny"));

apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


io.on('connection', (socket) => {
    socket.on("join",(nickname,done)=>{
        socket.join(nickname);
        done();
        socket.to(nickname).emit("welcome");
    })
    console.log('a user connected')
})

// server.listen({ port: restPORT }, () => {
//     console.log(`Server is running on http://localhost:${restPORT}/graphql`)
// });

server.listen({ port: graphqlPORT }, () => {
    console.log(`Server is running on http://localhost:${graphqlPORT}/graphql`)
});