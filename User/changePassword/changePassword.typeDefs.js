import {gql} from "apollo-server";

export default gql`
    type ChangePasswordResult {
        ok:Boolean!
        error:String
    }
    type Mutation {
        changePassword(
            password: String!
            newPassword: String!
        ):ChangePasswordResult!
    }
`