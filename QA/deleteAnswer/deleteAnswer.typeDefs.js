import {gql} from "apollo-server";

export default gql`
    type DeleteAnswerResult{
        ok:Boolean!
        error:String
    }
    type Mutation {
        deleteAnswer(id:Int!):DeleteAnswerResult!
    }
`;