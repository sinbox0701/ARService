import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Mutation:{
        createQuestion:protectedResolver(async (_,__,{loggedInUser})=>{
            const {title,answer} = args;
            if(!loggedInUser.id){
                return {
                    ok:false,
                    error:"로그인 후 작성해주세요"
                }
            }
            const question = await client.question.create({
                data:{
                    title,
                    answer,
                    user:{
                        connect:{
                            id:loggedInUser.id
                        }
                    }
                }
            });
            if(!question.id){
                return {
                    ok:false,
                    error:"다시 시도해주세요"
                }
            }
            return{
                ok:true
            }
        })
    }
}