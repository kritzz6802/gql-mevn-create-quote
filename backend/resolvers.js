import { quotes, users } from './fakeapi.mjs';
import { randomBytes } from 'crypto';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const User = mongoose.model("User");
const Quote = mongoose.model("Quote");

const resolvers = {
    // Query: {
    //     users: () => users,
    //     // user:(_,args)=>users.find(user=>user._id==args._id), both are working
    //     user: (parent, { _id }, context, info) => users.find(user => user._id == _id),
    //     quotes: () => quotes,
    //     iquotes: (_, { by }) => quotes.filter(quote => quote.by == by)
    // },
    // User: {
    //     quotes: (ur) => quotes.filter(quote => quote.by == ur._id),// users._id is also working
    // },
    // Mutation: {
    //     signupUser: (_, { userNew }) => {
    //         const _id = randomBytes(5).toString("hex");
    //         users.push({
    //             _id,
    //            ...userNew
    //         })
    //         return users.find(user => user._id == _id);

    //     }

    // },
    // for mongo db above code for example prectice without storing
    Query: {
        users: async() => await User.find({}),
        user:async (_, { _id }) => await User.findOne({_id}),
        quotes:async () => await Quote.find({}).populate("by","_id fname"),
        iquotes:async (_, { by }) => await Quote.find({by}),
        myprofile:async (_,args,{userId})=>{
            if(!userId) throw new Error("You must be logged in")
           return await User.findOne({_id:userId})
        }
    },
    User: {
        quotes:async (ur) => await Quote.find({by:ur._id}).populate("by","_id fname"),// users._id is also working
    },
    Mutation: {
        signupUser: async (_, { userNew }) => {
            const user = await User.findOne({ email: userNew.email });
            if (user) {
                throw new Error("User already exists with that email");
            }
            const hashPassword = await bcrypt.hash(userNew.password, 12);
            const newUser = new User({
                ...userNew,
                password: hashPassword

            });
            return await newUser.save();

        },
        signinUser: async (_, { userSignin }) => {
            const user=await User.findOne({email:userSignin.email});
            if(!user){
                throw new Eroor("User doesn't exists with that email")
            }
            const doMatch = await bcrypt.compare(userSignin.password,user.password);
            if(!doMatch){
                throw new Error("email or password is invalid")
            }
            const token = jwt.sign({userId:user._id},process.env.JWT_SECRET);
            return {token}
        },
        createQuote:async(_,{name},{userId})=>{
            if(!userId) throw new Error("You must be logged in")
            const newQuote = new Quote({
            name,
            by:userId
        });
        await newQuote.save();
        return "Quote saved successfully"
        }

    }
}

export default resolvers;