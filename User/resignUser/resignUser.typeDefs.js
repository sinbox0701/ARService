import {gql} from "apollo-server";

export default gql`
    type ResignUserResult {
        ok:Boolean!
        error:String
    }
    type Mutation {
        resignUser(id:Int!):ResignUserResult!
    }
`;