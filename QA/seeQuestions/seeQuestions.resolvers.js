import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Query:{
        seeQuestions:protectedResolver(async (_,{offset},{loggedInUser})=>{
            if(!loggedInUser.id){
                return null;
            }
            if(loggedInUser.isManaged){
                return client.question.findMany({
                    orderBy:{updatedAt:'desc'},
                    include:{
                        user:true
                    }
                });
            }
            return client.question.findMany({
                take:10,
                skip:offset,
                where:{userId:loggedInUser.id},
                orderBy:{updatedAt:'desc'},
                include:{
                    user:true
                }
            });
        })
    }
}