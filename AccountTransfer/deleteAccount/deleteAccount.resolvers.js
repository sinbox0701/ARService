import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Mutation:{
        deleteAccount:protectedResolver(async (_,{id},{loggedInUser})=>{
            try{
                if(!loggedInUser.isManaged){
                    return {
                        ok:false,
                        error:"κΆν μμ"
                    }
                }
                await client.accountTransfer.delete({where:{id}});
                return {
                    ok:true
                }
            }catch{
                return {
                    ok:false,
                    error:"DELETE ACCOUNT ERROR!"
                }
            }
        })
    }
}