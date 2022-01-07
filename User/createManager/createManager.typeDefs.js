import {gql} from "apollo-server";

export default gql`
    type CreateManagerResult {
        ok:Boolean!
        error:String
    }
    type Mutation {
        createManager(
            nickname: String!
            password: String!
        ):CreateManagerResult!
    }
`