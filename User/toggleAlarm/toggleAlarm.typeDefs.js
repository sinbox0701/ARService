import {gql} from "apollo-server";

export default gql`
    type ToggleAlarmResult {
        ok:Boolean!
        error:String
    }
    type Mutation{
        toggleAlarm:ToggleAlarmResult!
    }
`;