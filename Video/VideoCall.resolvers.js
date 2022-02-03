import client from "../client"

export default {
    VideoCall:{
        timeCount: async ({id}) => {
            const videoCall = await client.videoCall.findUnique({where:{id}});
            const start = new Date(videoCall.startTime);
            const end = new Date(videoCall.endTime);
            const elapsedSec = (end.getTime()-start.getTime())/1000;
            return elapsedSec;
        } 
    }
}