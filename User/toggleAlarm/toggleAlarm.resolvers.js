import client from "../../client";
import { protectedResolver } from "../User.utils";

export default {
    Mutation:{
        toggleAlarm:protectedResolver(async(_,__,{loggedInUser})=>{
            if(!loggedInUser){
                return {
                    ok:false,
                    error:"로그인 후 이용가능합니다."
                }
            }
            await client.user.update({
                where:{
                    id:loggedInUser.id
                },
                data:{
                    ignored:!loggedInUser.ignored
                }
            });
            return {
                ok:true
            }
        })
    }
}