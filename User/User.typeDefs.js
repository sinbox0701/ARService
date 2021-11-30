import {gql} from "apollo-server";

export default gql`
    enum SEX {
        M
        W
    }
    type User {
        id: Int! 
        nickname: String!
        password: String!
        age: String!
        bio: SEX!
        profile: String!
        intro: String!
        createdAt: String! 
        updatedAt: String! 
    }
`;