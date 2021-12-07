import {gql} from "apollo-server";

export default gql`
    type Question{
        id: Int!
        user: User!
        title: String!
        content: String
        answer: Answer
        createdAt: String!
        updatedAt: String!
    }
    type Answer {
        id: Int!
        author: String!
        question: Question!
        content: String
        createdAt: String!
        updatedAt: String!
    }
`;