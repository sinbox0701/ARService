import client from "../../client";
import { protectedResolver } from "../User.utils";

export default {
    Query:{
        me:protectedResolver(async (_,__,{loggedInUser}) => {
            if(!loggedInUser){
                return null;
            }
            return client.user.findUnique({where:{id:loggedInUser.id}});
        })
    }
}