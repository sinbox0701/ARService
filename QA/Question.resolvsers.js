import client from "../client"

export default {
    Question:{
        answer:({id}) => client.question.findUnique({where:{id}}).answer(),
    }
}