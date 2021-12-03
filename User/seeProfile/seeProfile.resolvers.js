import { protectedResolver } from "../User.utils";
import client from "../../client"

export default {
    Query:{
        seeProfile: protectedResolver(async (_,{id},{loggedInUser})=>{
            if(!loggedInUser.id){
                return null;
            }
            const user = await client.user.findUnique({
                where:{
                    id
                }
            });
            if(!user.id){
                return null;
            }
            return user;
        })
    }
}