import client from "../../client";
import { protectedResolver } from "../User.utils";

export default {
    Mutation:{
        videoCallCheck:protectedResolver(async(_,{id},{loggedInUser})=>{
            if(!loggedInUser){
                return {
                    ok:false,
                    error:"로그인 후 이용가능합니다."
                }
            }
            const user = await client.user.findUnique({
                where:{
                    id
                },
                select:{
                    id:true,
                    videoCall:true
                }
            })
            if(user.id !== loggedInUser.id){
                await client.user.update({
                    where:{
                        id:user.id
                    },
                    data:{
                        videoCall:!user.videoCall
                    }
                });
            }
            return {
                ok:true
            }
        })
    }
}