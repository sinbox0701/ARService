import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Mutation:{
        createAnswer:protectedResolver(async (_,args,{loggedInUser})=>{
            const {questionId, content} = args;
            if(!loggedInUser.isManaged){
                return {
                    ok:false,
                    error:"답변을 할 수 없습니다"
                }
            }
            const question = await client.question.findUnique({
                where:{
                    id:questionId
                },
                select:{
                    id:true
                }
            });
            if(!question.id){
                return {
                    ok:false,
                    error:"질문이 없습니다"
                }
            }
            const answer = await client.answer.create({
                data:{
                    author:loggedInUser.nickname,
                    content,
                    question:{
                        connect:{
                            id:question.id
                        }
                    }
                }
            });
            if(!answer.id){
                return {
                    ok:false,
                    error:"다시 시도해주세요"
                }
            }
            return {
                ok:true
            }

        })
    }
}