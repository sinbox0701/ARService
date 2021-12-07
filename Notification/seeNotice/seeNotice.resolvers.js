import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Query:{
        seeNotice:protectedResolver(async (_,{id},{loggedInUser})=>{
            if(!loggedInUser.id){
                return null;
            }
            return client.notification.findUnique({where:{id}});
        })
    }
}