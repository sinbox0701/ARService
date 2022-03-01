import {gql} from "apollo-server";

export default gql`
    type ChargeAccountResult {
        ok:Boolean!
        error:String
    }
    type Mutation {
        chargeAccount(cash: Int!):ChargeAccountResult!
    }
`