require('dotenv').config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import {typeDefs,resolvers} from "./schema";
import { getUser } from "./User/User.utils";

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (ctx) => {
        if(ctx.req){
            return {
                loggedInUser: await getUser(ctx.req.headers.token)
            }
        }else{
            const {
                connection:{context}
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
app.use(logger("tiny"));

apollo.applyMiddleware({app}); 
app.use("/static",express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const users = [
    {id:1, name: "유저1"},
    {id:2, name: "유저2"},
    {id:3, name: "유저3"}
];

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.get("/api/users", (req, res) => {
    //유저 정보 반환
    res.json({ok: true, users: users});
});
app.get("/api/users/user", (req, res) => {
    const user_id = req.query.user_id
    const user = users.filter(data => data.id == user_id);

    res.json({ok: false, user: user})
});
app.get("/api/users/:user_id", (req, res) => {
    const user_id = req.params.user_id
    const user = users.filter(data => data.id == user_id);

    res.json({ok: true, user: user})
});
app.post("/api/users/add", (req, res) => {
    const { id, name } = req.body;
    const user = users.concat({id, name});

    res.json({ok: true, users: user});
})
app.put("/api/users/update", (req, res) => {
    const { id, name } = req.body;
    const user = users.map(data => {
        if(data.id == id) {
            data.name = name;
        }
        return {
            id: data.id,
            name: data.name
        };
    });

    res.json({ok: true, users: user});
});//전체 데이터 수정
app.patch("/api/user/update/:user_id", (req, res) => {
    const { user_id} = req.params;
    const { name } = req.body;
    const user = users.map(data => {
        if(data.id == user_id) {
            data.name = name;
        }

        return {
            id: data.id,
            name: data.name
        };
    });

    res.json({ok: true, users: user});
});//단일 데이터 수정
app.delete("/api/user/delete", (req, res) => {
    const user_id = req.query.user_id;
    const user = users.filter(data => data.id != user_id );

    res.json({ok: true, users: user});
});

app.listen({port:restPORT}, () => {
    console.log(`Server is running on http://localhost:${restPORT}/graphql`)
});

app.listen({port:graphqlPORT}, () => {
    console.log(`Server is running on http://localhost:${graphqlPORT}/graphql`)
});