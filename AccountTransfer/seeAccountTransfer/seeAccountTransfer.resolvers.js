import { protectedResolver } from "../../User/User.utils";
import client from "../../client"

export default {
    Query:{
        seeAccountTransfer: protectedResolver(async (_,{id},{loggedInUser})=>{
            if(!loggedInUser.id){
                return null;
            }
            const account = await client.accountTransfer.findUnique({
                where:{
                    id
                },
                include:{
                    user:true
                }
            });
            if(!account){
                return null;
            }
            return account;
        })
    }
}