import client from "../client";

export default{
    Answer:{
        question:({quesionId}) => client.question.findUnique({where:{id:quesionId}}),
    }
}