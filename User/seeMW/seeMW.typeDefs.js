import {gql} from "apollo-server";

export default gql`
   type Query{
        seeMW(offset:Int!):[User]
   }
`;