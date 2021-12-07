import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Query:{
        seeNotices:protectedResolver(async (_,__,{loggedInUser})=>{
            if(!loggedInUser.id){
                return null;
            }
            return client.notification.findMany({orderBy:{createdAt:'desc'}})
        })
    }
}