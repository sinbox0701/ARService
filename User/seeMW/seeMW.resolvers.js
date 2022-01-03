import client from "../../client";
import { protectedResolver } from "../User.utils";

export default {
    Query:{
        seeMW: protectedResolver(async (_,__,{loggedInUser})=> {
            if(!loggedInUser.id){
                return null;
            }
            const user = await client.user.findUnique({
                where:{
                    id:loggedInUser.id
                }
            });
            if(!user){
                return null;
            }
            if(user.bio === "M"){
                return client.user.findMany({
                    where:{
                        isManaged:false,
                        bio:"W"
                    }
                })
            }else {
                return client.user.findMany({
                    where:{
                        isManaged:false,
                        bio:"M"
                    }
                })
            }
        })
    }
}