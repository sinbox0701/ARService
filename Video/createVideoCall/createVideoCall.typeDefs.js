import {gql} from "apollo-server";

export default gql`
    type CreateVideoCallResult {
        ok:Boolean!
        error:String
    }
    type Mutation{
        createVideoCall(caller:String! callee: String! startTime:String endTime:String):CreateVideoCallResult!
    }
`;