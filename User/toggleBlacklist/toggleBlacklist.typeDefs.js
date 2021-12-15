import {gql} from "apollo-server";

export default gql`
    type toggleBlacklistResult{
        ok:Boolean!
        error:String
    }
    type Mutation {
        toggleBlacklist(id:Int!):toggleBlacklistResult!
    }
`;