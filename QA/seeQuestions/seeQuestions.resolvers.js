import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Query:{
        seeQuestions:protectedResolver(async (_,__,{loggedInUser})=>{
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
                where:{userId:loggedInUser.id},
                orderBy:{updatedAt:'desc'},
                include:{
                    user:true
                }
            });
        })
    }
}