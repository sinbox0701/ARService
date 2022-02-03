import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Query:{
        seeVideoCalls:protectedResolver(async (_,__,{loggedInUser}) => {
            if(!loggedInUser.isManaged){
                return null;
            }
            return await client.videoCall.findMany({orderBy:{createdAt:'desc'}});
        })
    }
}