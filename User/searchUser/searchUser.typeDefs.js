import {gql} from "apollo-server";

export default gql`
    type Query {
        searchUser(
            keyword:String!, searchType:Int,
            bio:SEX, 
            createdMinY:String,createdMinM:String,createdMinD:String 
            createdMaxY:String,createdMaxM:String,createdMaxD:String
         ):[User]
    }
`;