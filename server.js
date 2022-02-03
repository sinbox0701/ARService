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

server.listen({ port: graphqlPORT }, () => {
    console.log(`Server is running on http://localhost:${graphqlPORT}/graphql`)
});

let users = {};
let socketToRoom = {};

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on("join_room", (data) => {
        if (users[data.room]) {
            const length = users[data.room].length;
            console.log({ length })
            if (length === 2) {
                console.log("can't enter")
                const message = "It's full"
                socket.to(socket.id).emit('room_full', message);
                return;
            }

            users[data.room].push({ id: socket.id, nickname: data.room })
        } else {
            users[data.room] = [{ id: socket.id, nickname: data.room }]
        }

        socketToRoom[socket.id] = data.room;

        socket.join(data.room);
        console.log(`[${socketToRoom[socket.id]}]: ${socket.id} enter`)

        const usersInThisRoom = users[data.room].filter(user => user.id !== socket.id)
        console.log({ usersInThisRoom })
        // done();
        io.sockets.to(socket.id).emit("all_users", usersInThisRoom);
    })

    socket.on('offer', sdp => {
        console.log('offer: ' + socket.id);
        // socket.broadcast.emit('getOffer', sdp)
        socket.broadcast.emit('getOffer', sdp)

    })

    socket.on('answer', sdp => {
        console.log('answer: ' + socket.id);

        socket.broadcast.emit('getAnswer', sdp);
    })

    socket.on('candidate', candidate => {
        console.log('candidate: ' + socket.id);
        const startDate = new Date();
        console.log(startDate);
        // console.log(usersInThisRoom)
        socket.broadcast.emit('getCandidate', candidate)
    })

    socket.on('disconnect', () => {
        console.log(`[${socketToRoom[socket.id]}]: ${socket.id} exit`);

        const roomID = socketToRoom[socket.id];

        let room = users[roomID];
        if (room) {
            room = room.filter(user => user.id !== socket.id);
            users[roomID] = room;
        }

        socket.broadcast.to(room).emit('user_exit', { id: socket.id });
        console.log(users);
        console.log({ users })
        const endDate = new Date();
        console.log(endDate);
    })
})

// server.listen({ port: restPORT }, () => {
//     console.log(`Server is running on http://localhost:${restPORT}/graphql`)
// });
