import {gql} from "apollo-server";

export default gql`
    type deleteQuestionResult{
        ok:Boolean!
        error:String
    }
    type Mutation {
        deleteQuestion(id:Int!):deleteQuestionResult
    }
`;