import {gql} from "apollo-server";

export default gql`
    type AccountTransfer{
        id: Int!
        user: User!
        cash: Int!
        createdAt: String!
        updatedAt: String!
    }
`;