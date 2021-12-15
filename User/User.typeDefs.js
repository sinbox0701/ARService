import {gql} from "apollo-server";

export default gql`
    enum SEX {
        M
        W
    }
    enum Status {
        ACTIVATE
        STOP
        BLOCK
    }
    enum Group {
        NORMAL
        VIP
        PARTTIME
    }
    type User {
        id: Int! 
        nickname: String!
        password: String!
        age: String!
        bio: SEX!
        profile: String
        intro: String!
        status: Status!
        local: String!
        phone: String!
        email: String!
        group: Group!
        isManaged: Boolean!
        createdAt: String! 
        updatedAt: String! 
    }
`;