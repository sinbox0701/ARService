import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Mutation:{
        createVideoCall:protectedResolver(async(_,{caller,callee,startTime,endTime},{loggedInUser})=>{
            if(!loggedInUser){
                return {
                    ok:false,
                    error:"로그인 후 이용가능합니다."
                }
            }
            try{
                if(callee !== loggedInUser.nickname){
                    await client.videoCall.create({
                        data:{
                            caller,
                            callee,
                            startTime,
                            endTime
                        }
                    })
                }
                return {
                    ok:true
                }
            }catch(e){
                console.log(e)
                return {
                    ok:false,
                    error:e
                }
            }
        })
    }
}