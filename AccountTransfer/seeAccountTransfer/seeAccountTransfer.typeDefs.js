import {gql} from "apollo-server";

export default gql`
    type Query{
        seeAccountTransfer(id:Int!):AccountTransfer
    }
`;