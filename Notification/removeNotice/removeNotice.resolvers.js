import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Mutation:{
        removeNotice:protectedResolver(async (_,{id},{loggedInUser})=>{
            try{
                if(!loggedInUser.isManaged){
                    return {
                        ok:false,
                        error:"삭제 권한이 없습니다!"
                    }
                }
                await client.notification.delete({where:{id}});
                return{
                    ok:true
                }
            }catch(e){
                return {
                    ok:false,
                    error:"remove Notification Error!"
                }
            }
        })
    }
}