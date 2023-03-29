import { gql } from 'apollo-server-express';

const typeDefs = gql`
type Query{
    users:[User]
    quotes:[QuoteWithName]
    user(_id:ID!):User
    iquotes(by:ID!):[Quote]
    myprofile:User
}
type User{
    _id:ID!
    fname:String!
    lname:String!
    email:String!
    password:String!
    quotes:[QuoteWithName]
}
type Quote{
    by:ID!
    name:String
}
type Token{
    token:String!
}
type QuoteWithName{
    name:String
    by:IdName
}
type IdName{
    _id:String
    fname:String
}
input UserInput{
    fname:String!
    lname:String!
    email:String!
    password:String!
}
input UserSigninInput{
    email:String!
    password:String!
}
type Mutation{
    signupUser(userNew:UserInput!):User
    signinUser(userSignin:UserSigninInput!):Token
    createQuote(name:String):String
}
`;
export default typeDefs;