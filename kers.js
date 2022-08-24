const confession =require( "../models/confession")

const getRecent = async(req,res)=>{

    
    try {
        const {page,limit} =req.query;
        
dasda 




            const post = await confession.find({},{createdBy:0,gender:0,showGender:0,_id:0,__v:0}).limit(limit).skip((page-1)*limit).sort({_id:-1})


            if(post.length>=0){
                res.send({post,total:post.length,page:page})
            }



            else{
         
                res.status(404).send({
                    code:404,
                    msg:"Post not found",
                    post:[]
                })
            }

        


    
            
           

    } catch (error) {
        console.log(error)
        res.send("Something went wrong")
    }


}



module.exports = getRecent  