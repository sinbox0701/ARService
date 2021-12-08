import client from "../../client"
import { protectedResolver } from "../../User/User.utils"

export default {
    Query:{
        readQuestion:protectedResolver(async (_,{id},{loggedInUser})=>{
            if(!loggedInUser.id){
                return {
                    ok:false,
                    error:"로그인 후 이용해주세요"
                }
            }
            return client.question.findUnique({where:{id}});
        })
    }
}