import client from "../../client";
import bcrypt from "bcrypt";
import {createWriteStream} from "fs"
import { protectedResolver } from "../User.utils";

export default {
    Mutation:{
        createManager: protectedResolver(async (_,args,{loggedInUser}) => {
            try {
                if(!loggedInUser.isManaged){
                    return {
                        ok:false,
                        error:"관리자 권한이 없습니다!"
                    }
                }
                const {nickname,password} = args;
                const user = await client.user.findFirst({
                    where:{nickname}
                });
                if(user){
                    return {
                        ok:false,
                        error:"이미 존재하는 닉네임입니다."
                    }
                }else {
                    const hashedPassword = await bcrypt.hash(password,10);
                    const newUser = await client.user.create({
                        data:{
                            nickname,
                            ...(hashedPassword && {password:hashedPassword}),
                            isManaged:true,
                            age: 0,
                            bio: "M",
                            intro: "Manager",
                            local: "Manager",
                            phone: "Manager",
                            email: "Manager",
                        }
                    });
                    if(newUser.id){
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
                return e;
            }
        })
    }
}