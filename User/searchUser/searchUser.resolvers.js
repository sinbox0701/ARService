import client from "../../client";
import { protectedResolver } from "../User.utils";

export default {
    Query:{
        searchUser:protectedResolver(async (_,args,{loggedInUser})=>{
            const {
                keyword,
                bio, 
                createdMinY,createdMinM,createdMinD, 
                createdMaxY,createdMaxM,createdMaxD,
                searchType
            } = args;
            try{
                const Type = [{nickname:{startsWith:keyword}},{nickname:{contains:keyword}},{nickname:keyword}];
                const createdMin = new Date(Number(createdMinY),Number(createdMinM)-1,Number(createdMinD));
                const MIN = (createdMinY && createdMinM && createdMinD);
                const createdMax = new Date(Number(createdMaxY),Number(createdMaxM)-1,Number(createdMaxD));
                const MAX = (createdMaxY && createdMaxM && createdMaxD);
                const CHECK = MIN || MAX;
                
                const users = await client.user.findMany({
                    where:{
                        ...(bio && {bio}),
                        ...(CHECK && {createdAt:{
                            gte:(MIN ? createdMin : new Date()),
                            lte:(MAX ? createdMax : new Date())  
                        }}),
                        ...((keyword) && (searchType ? Type[searchType] : Type[0]))
                    }
                });
                return users;
            }
            catch {
                return [];
            }
            
        })
    }
}