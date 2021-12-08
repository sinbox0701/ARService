import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Mutation:{
        deleteQuestion:protectedResolver(async(_,{id},{loggedInUser})=>{
            try{
                if(!loggedInUser.id){
                    return{
                        ok:false,
                        error:"로그인 후 이용해주세요"
                    }
                }
                if(loggedInUser.isManaged){
                    await client.question.delete({where:{id}});
                    return {
                        ok:true
                    }
                }
                else {
                    const question = await client.question.findUnique({where:{id}});
                    if(question.userId === loggedInUser.id){
                        await client.question.delete({where:{id:question.id}});
                        return {
                            ok:true
                        }
                    }
                    return {
                        ok:false,
                        error:"삭제 권한이 없습니다!"
                    }
                }
            }catch(e){
                return {
                    ok:false,
                    error:"DELETE QUESTION ERROR"
                }
            }

        })
    }
}