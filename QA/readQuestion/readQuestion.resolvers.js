import client from "../../client"
import { protectedResolver } from "../../User/User.utils"

export default {
    Query:{
        readQuestion:protectedResolver(async (_,{id},{loggedInUser})=>{
            if(!loggedInUser.id){
                return null;
            }
            return client.question.findUnique({
                where:{id},
                include:{
                    answer:true
                }
            });
        })
    }
}