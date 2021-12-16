import {gql} from "apollo-server";

export default gql`
    type CreateAccountResult {
        ok:Boolean!
        error:String
    }
    type Mutation {
        createAccount(
            nickname: String!
            password: String!
            age: Int!
            bio: SEX!
            local: String!
            email:String!
            phone: String!
            profile: Upload
            intro: String!
        ):CreateAccountResult!
    }
`