import {gql} from "apollo-server";

export default gql`
    type CreateNoticeResult {
        ok:Boolean!
        error:String
    }
    type Mutation {
        createNotice(
            title: String!
            content: String
        ):CreateNoticeResult!
    }
`