import {gql} from "apollo-server";

export default gql`
    type VideoCallCheckResult {
        ok:Boolean!
        error:String
    }
    type Mutation{
        videoCallCheck(id:Int!):VideoCallCheckResult!
    }
`;