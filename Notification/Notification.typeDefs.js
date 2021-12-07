import {gql} from "apollo-server";

export default gql`
    type Notification {
        id: Int! 
        title: String!
        content: String
        createdAt: String! 
        updatedAt: String! 
    }
`;