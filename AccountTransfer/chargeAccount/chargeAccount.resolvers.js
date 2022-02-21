import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Mutation:{
        chargeAccount:protectedResolver(async(_,args,{loggedInUser})=>{
            const {cash} = args;
            try{
                if(!loggedInUser){
                    return {
                        ok:false,
                        error:"계좌 충전 불가"
                    }
                }
                const account = await client.accountTransfer.create({
                    data:{
                        cash,
                        user:{
                            connect:{
                                id:loggedInUser.id
                            }
                        }
                    }
                })
                if(!account){
                    return {
                        ok:false,
                        error:"충전 실패!"
                    }
                }
                return {
                    ok:true
                }
            }catch(e){
                return {
                    ok:false,
                    error:"chargeAccount Error"
                }
            }
        })
    }
}