import { protectedResolver } from "../User.utils";
import client from "../../client"

export default {
    Query:{
        seeProfile: protectedResolver(async (_,{nickname},{loggedInUser})=>{
            if(!loggedInUser.id){
                return null;
            }
            const user = await client.user.findUnique({
                where:{
                    nickname
                }
            });
            if(!user){
                return null;
            }
            return user;
        })
    }
}