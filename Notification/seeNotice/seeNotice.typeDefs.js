import {gql} from "apollo-server";

export default gql`
    type Query{
        seeNotice(id:Int!):Notification
    }
`;