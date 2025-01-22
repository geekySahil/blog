import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from '../conf/conf';


export class databaseService{
    client = new Client()
    
    databases
    bucket

    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.projectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client);
    }

    async createPost ({slug, userId, featuredImage, status, content}){
        try {
            return await this.databases.createDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    slug, 
                    content, 
                    title,
                    featuredImage, 
                    status
                }
            )
        } catch (error) {
            console.log("createPost err:: " + error)
        }
    }

    async updatePost (slug, {content, title, featuredImage, status}){
        try {
          await this.databases.updateDocument(
            conf.databaseId,
            conf.collectionId,
            slug,
            {
                content,
                featuredImage,
                status
            }
          )
        } catch (error) {
            console.log("updatePost err:: " + error)
        }
    }

    async getPosts (queries = [Query.equal('status', 'active')]){
        try {
            return await this.databases.listDocuments(conf.databaseId, conf.collectionId, queries )
          
        } catch (error) {
            console.log("getPost err:: " + error)
            return false
        }
    }

    async getPost (slug){
        try {
           return await this.databases.getDocument(conf.databaseId, conf.collectionId, slug)
        } catch (error) {
            console.log("getPost err" + error)
            return false
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.databaseId, conf.collectionId, slug)
            return true
        } catch (error) {
            console.log('deletePost error' + error)
            return false
        }
    }

    // file upload methods

    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.bucketId, ID.unique(), file)
        } catch (error) {
            console.log("createFile error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(conf.bucketId, fileId)
            return true
        } catch (error) {
            console.log("deleteFile error", error)
            return false ;
        } 
    }

    getFilePreview(fileId){
        this.bucket.getFilePreview(conf.bucketId, fileId)
    }



}

const service = new databaseService();

export default service;