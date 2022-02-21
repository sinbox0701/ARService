import client from "../../client";
import { protectedResolver } from "../User.utils";

export default {
    Mutation:{
        chargePay: protectedResolver(async (_,{id,pay},{loggedInUser})=>{
            if(!loggedInUser.isManaged){
                return {
                    ok:false,
                    error:"매니저만 이용가능합니다"
                }
            }
            const user = await client.user.findUnique({where:{id},select:{id:true,pay:true}});
            const payUpdate = await client.user.update({
                where:{
                    id:user.id
                },
                data:{
                    pay:(user.pay + pay)
                }
            });
            if(payUpdate){
                return {
                    ok:true
                }
            }
            return {
                ok:false,
                error:"payUpdate error"
            }
        })
    }
}