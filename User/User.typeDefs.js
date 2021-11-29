import {gql} from "apollo-server";

export default gql`
    type User {
        id: Int! 
        nickname: String!
        age: String!
        profile: String!
        intro: String!
        createdAt: String! 
        updatedAt: String! 
    }
`;