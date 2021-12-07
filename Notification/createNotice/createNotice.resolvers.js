import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Mutation:{
        createNotice:protectedResolver(async(_,args,{loggedInUser})=>{
            const {title,content} = args;
            try{
                if(!loggedInUser.isManaged){
                    return {
                        ok:false,
                        error:"작성권한이 없습니다!"
                    }
                }
                const notice = await client.notification.create({
                    data:{
                        title,
                        content
                    }
                })
                if(!notice.id){
                    return {
                        ok:false,
                        error:"공지사항 생성 실패!"
                    }
                }
                return {
                    ok:true
                }
            }catch(e){
                return {
                    ok:false,
                    error:"createNotice Error"
                }
            }
        })
    }
}