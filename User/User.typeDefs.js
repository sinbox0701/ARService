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
        age: Int!
        bio: SEX!
        profile: String
        intro: String!
        status: Status!
        local: String!
        phone: String!
        email: String!
        blacklist: Boolean!
        group: Group!
        isManaged: Boolean!
        loginCount: Int!
        lastLogin: String
        ignored: Boolean!
        videoCall: Boolean!
        createdAt: String! 
        updatedAt: String! 
    }
`;