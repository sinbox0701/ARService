import client from "../../client";
import { protectedResolver } from "../User.utils";

export default {
    Query:{
        seeMW: protectedResolver(async (_,{offset},{loggedInUser})=> {
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
                    take:10,
                    skip:offset,
                    where:{
                        isManaged:false,
                        bio:"W"
                    },
                    orderBy:{
                        createdAt:"desc"
                    }
                })
            }else {
                return client.user.findMany({
                    take:10,
                    skip:offset,
                    where:{
                        isManaged:false,
                        bio:"M"
                    },
                    orderBy:{
                        createdAt:"desc"
                    }
                })
            }
        })
    }
}