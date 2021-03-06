import client from "../../client";
import { protectedResolver } from "../User.utils";

export default {
    Mutation:{
        toggleBlacklist: protectedResolver(async (_,{id},{loggedInUser})=>{
            if(!loggedInUser.isManaged){
                return {
                    ok:false,
                    error:"κΆνμμ"
                }
            }
            const user = await client.user.findUnique({where:{id}});
            await client.user.update({
                where:{
                    id
                },
                data:{
                    blacklist:!user.blacklist
                }
            })
        })
    }
}