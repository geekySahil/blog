import { Client ,Account, ID } from "appwrite";
import conf from "../conf/conf.js"




export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.projectId)
        this.account = new Account(this.client)
    }

    async createAccount({password, username, email}){
        try {
            const userAccount = await this.account.create(ID.unique(), email , username , password)
            if(userAccount){
                return this.login({email, password})
                
            }
            else{
                return userAccount
            }
        } catch (error) {
            console.log("APPWRITESERVICE :: ERROR IN createAccount")
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log("APPWRITESERVICE :: LOGIN ERROR")
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions()   
        } catch (error)
        {
            throw error; 
        }
        return null ;
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
    }
}

const authservice = new AuthService()

export {authservice} ;

