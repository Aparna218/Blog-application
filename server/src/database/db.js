import mongoose from "mongoose"

 const connection = async (username, password) => {
    const URL ="mongodb+srv://aparna21:tpzmDVkZSc3mpMTf@cluster21.u69lmjr.mongodb.net/Blog-Application"
    try{
          await mongoose.connect(URL,{useNewUrlParser:true})
          console.log(" Database conneted successfully")
    } catch (error) {
           console.log(" Error while connecting with database", error)
    }
}
export default connection 