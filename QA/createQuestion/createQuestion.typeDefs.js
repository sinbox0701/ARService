import {gql} from "apollo-server";

export default gql`
    type CreateAnswerResult {
        ok:Boolean!
        error:String
    }
    type Mutation {
        createQuestion(title:String!, content:String):CreateAnswerResult!
    }
`;