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
            age: String!
            bio: SEX!
            profile: Upload!
            intro: String!
        ):CreateAccountResult!
    }
`