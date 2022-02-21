import {gql} from "apollo-server";

export default gql`
    type ChargePayResult {
        ok:Boolean!
        error:String
    }
    type Mutation {
        chargePay(
            id: Int!
            pay: Int!
        ):ChargePayResult!
    }
`