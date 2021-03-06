import client from "../../client";
import { protectedResolver } from "../User.utils";

export default {
    Query:{
        seeUsers:protectedResolver(async (_,__,{loggedInUser}) => {
            if(!loggedInUser.isManaged){
                return null;
            }
            return await client.user.findMany({orderBy:{createdAt:'desc'}});
        })
    }
}