import client from "../../client";
import bcrypt from "bcrypt";
import {createWriteStream} from "fs"

export default {
    Mutation:{
        createAccount: async (_,args) => {
            try {
                const {nickname,age,bio,profile,intro,password,local,email,phone} = args;
                const user = await client.user.findFirst({
                    where:{nickname}
                });
                if(user){
                    return {
                        ok:false,
                        error:"이미 존재하는 닉네임입니다."
                    }
                }else {
                    let profileUrl = null;
                    const hashedPassword = await bcrypt.hash(password,10);
                    if(profile){
                        
                        const {filename, createReadStream} = await profile;
                        const newFileName = `${nickname}-${Date.now()}-${filename}`;
                        const rs = createReadStream();
                        const ws = createWriteStream(process.cwd()+"/uploads/"+newFileName);
                        rs.pipe(ws);
                        profileUrl = `http://localhost:4000/static/${newFileName}`;
                    }
                    const newUser = await client.user.create({
                        data:{
                            nickname,
                            age,
                            bio,
                            intro,
                            local,
                            email,
                            phone,
                            ...(hashedPassword && {password:hashedPassword}),
                            ...(profileUrl && {profile:profileUrl})
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
        }
    }
}