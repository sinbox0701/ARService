import {gql} from "apollo-server";

export default gql`
    type RemoveMutationResult{
        ok:Boolean!
        error:String
    }
    type Mutation {
        removeNotice(id:Int!):RemoveMutationResult
    }
`;