import {gql} from "apollo-server";

export default gql`
    type deleteAccountResult{
        ok:Boolean!
        error:String
    }
    type Mutation {
        deleteAccount(id:Int!):deleteAccountResult
    }
`;