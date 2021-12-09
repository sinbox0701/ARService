import {gql} from "apollo-server";

export default gql`
    type CreateAnswerResult {
        ok:Boolean!
        error:String
    }
    type Mutation {
        createAnswer(questionId:Int!, content:String):CreateAnswerResult!
    }

`;