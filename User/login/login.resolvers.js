import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
    Mutation:{
        login: async (_, args) => {
            const {nickname, password} = args;
            const user = await client.user.findUnique({
                where:{
                    nickname
                }
            });
            if(!user.id){
                return {
                    ok:false,
                    error:"존재하지 않는 사용자입니다!"
                }
            }
            const passwordOk = await bcrypt.compare(password,user.password);
            if(!passwordOk){
                return {
                    ok:false,
                    error:"비밀번호가 틀렸습니다!"
                }
            }
            await client.user.update({
                where:{
                    id:user.id
                },
                data:{
                    loginCount:user.loginCount+1,
                }
            });

            const token = await jwt.sign({id:user.id},process.env.SECRET_KEY);
            if(token){
                return{
                    ok:true,
                    token
                };
            }else{
                return {
                    ok:false,
                    error:"다시 로그인해주세요!"
                }
            }
        }
    }
}