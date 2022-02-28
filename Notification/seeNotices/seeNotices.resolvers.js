import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Query:{
        seeNotices:protectedResolver(async (_,{offset},{loggedInUser})=>{
            if(!loggedInUser.id){
                return null;
            }
            if(offset){
                return client.notification.findMany({
                    take:10,
                    skip:offset,
                    orderBy:{createdAt:'desc'}
                })
            }
            return client.notification.findMany({
                orderBy:{createdAt:'desc'}
            })
        })
    }
}