import client from "../../client";
import { protectedResolver } from "../User.utils";

export default {
    Mutation:{
        resignUser: protectedResolver(async (_,{id},{loggedInUser})=>{
            if(!loggedInUser.isManaged){
                return {
                    ok:false,
                    error:"매니저만 이용가능합니다"
                }
            }
            await client.user.delete({where:{id}});
            return {
                ok:true
            }
        })
    }
}