import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Query:{
        seeAnswers:protectedResolver(async (_,__,{loggedInUser})=>{
            if(!loggedInUser.isManaged){
                return null;
            }
            return client.answer.findMany({orderBy:{updatedAt:'desc'}});
        })
    }
}