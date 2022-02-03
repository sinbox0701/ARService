import {gql} from "apollo-server";

export default gql`
    type VideoCall {
        id: Int!
        caller: String!
        callee: String!
        startTime: String
        endTime: String
        timeCount: String
        createdAt: String!
        updatedAt: String!
    }
`;