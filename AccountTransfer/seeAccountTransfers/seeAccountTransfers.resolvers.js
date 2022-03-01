import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Query:{
        seeAccountTransfers:protectedResolver(async (_,__,{loggedInUser}) => {
            if(!loggedInUser.isManaged){
                return null;
            }
            return await client.accountTransfer.findMany({
                orderBy:{
                    createdAt:'desc'
                },
                include:{
                    user:true
                }
            });
        })
    }
}