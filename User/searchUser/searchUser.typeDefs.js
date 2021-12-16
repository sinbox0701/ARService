import {gql} from "apollo-server";

export default gql`
    type Query {
        searchUser(
            keyword:String, searchType:Int
            status:Status, bio:SEX!, 
            profile:Boolean, ageMin:Int, ageMax:Int,
            createdMinY:String,createdMinM:String,createdMinD:String 
            createdMaxY:String,createdMaxM:String,createdMaxD:String
         ):[User]
    }
`;