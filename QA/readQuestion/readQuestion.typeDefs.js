import {gql} from "apollo-server";

export default gql`
    type Query{
        readQuestion(id:Int!):Question
    }
`;