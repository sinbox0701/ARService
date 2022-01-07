import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../User.utils";

export default {
    Mutation:{
        changePassword: protectedResolver(async (_,args,{loggedInUser}) => {
            try {
                if(!loggedInUser.isManaged){
                    return {
                        ok:false,
                        error:"관리자 권한이 없습니다!"
                    }
                }
                const {password,newPassword} = args;
                const user = await client.user.findFirst({
                    where:{
                        nickname:loggedInUser.nickname
                    }
                });
                if(!user){
                    return {
                        ok:false,
                        error:"존재하지 않습니다."
                    }
                }else {
                    const passwordOk = await bcrypt.compare(password,user.password);
                    if(!passwordOk){
                        return {
                            ok:false,
                            error:"비밀번호 틀렸습니다!"
                        }
                    }
                    const hashedPassword = await bcrypt.hash(newPassword,10);
                    const updatedUser = await client.user.update({
                        where:{
                            id:user.id
                        },
                        data:{
                            password:hashedPassword,
                        }
                    });
                    if(updatedUser.id){
                        return {
                            ok:true
                        }
                    }else{
                        return {
                            ok:false,
                            error:"계정 생성에 실패하셨습니다."
                        }
                    }
                }
            }catch(e) {
                return {
                    ok:false,
                    error:e.message()
                };
            }
        })
    }
}