import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Mutation:{
        deleteAnswer:protectedResolver(async (_,{id},{loggedInUser})=>{
            try{
                if(!loggedInUser.isManaged){
                    return {
                        ok:false,
                        error:"κΆν μμ"
                    }
                }
                await client.answer.delete({where:{id}});
                return {
                    ok:true
                }
            }catch{
                return {
                    ok:false,
                    error:"DELETE ANSWER ERROR!"
                }
            }
        })
    }
}