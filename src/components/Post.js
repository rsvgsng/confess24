import React,{useEffect,useState} from 'react'
import Relatedcard from './Relatedcard'
import PostContentCard from './PostContentCard'
import Comments from './Comments'
import PostLoader from '../components/Skeletons/Post'
import Related from './Skeletons/Related'
import Support from './Support'
import DefaultStyle from './DefaultStyle'
import { MentionsInput, Mention } from 'react-mentions'
import Helmet from 'react-helmet'

import Uri from "./Uri";
import { useAlert } from 'react-alert'
import { Link, useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';

function Post() {


    var showSupport = false
    let { id } = useParams();
  var uri = Uri.uri ?Uri.uri :'' 

    const alert = useAlert();


    const pid = window.location.href.split("/")[4]
    const isAuthenticated = !!localStorage.getItem("token");
    
    const [data,setData] = useState()
    const [display,setDisplay]= useState('block')
 
    

const [comment,setComment]= useState('')



const [dcomment,setDcomment]=useState()
const [loading,setLoading]=useState(false)


// side bar

const [sidedata,setSidedata] =useState();






useEffect(() => {
    setDcomment(0)
    setData(0)
    setSidedata(0)
    fetchPost()
    Sidedata()
    Getallcomments()
    window.scrollTo(0,0)

}, [id])


async function Sidedata(){

    await fetch(uri+'/api/related',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },

    })

        .then(res=>res.json())
        .then(pussy=>{
            if(pussy.length>0){

                function shuffle(sourceArray) {
                    for (var i = 0; i < sourceArray.length - 1; i++) {
                        var j = i + Math.floor(Math.random() * (sourceArray.length - i));
                
                        var temp = sourceArray[j];
                        sourceArray[j] = sourceArray[i];
                        sourceArray[i] = temp;
                    }
                    return sourceArray;
                }
              var  s =pussy.filter(e => e.id !== id)
              var shuffled  = shuffle(s)
              setSidedata(shuffled.slice(0,15))
            } 
        })

}



async function Getallcomments(){
    setLoading(true)
    await fetch(uri+'/api/comment/'+pid,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }

    })

        .then(res=>res.json())
        .then(dick=>{
            if(dick.length>0){
                setDcomment(dick)
                
            }
        })
        setLoading(false)

}



const getUserMention= async (query,callback)=>{

        if(!query){
            return
        }
         
                await fetch(uri+'/api/mention/user/'+query,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                })
                .then(res=>res.json())
                .then(data=>{
                    callback(data)
                })

     


}






async function commentPost(e){

    setDisplay('none')
 

    await fetch(uri+'/api/comment/',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            comment:comment,
            postid:data[0].id
        })
        
    })
    
    .then(res=>res.json())
    .then(data=>{

            if(data.code==200){

                setComment(" ")
                alert.success("Comment posted!")

    Getallcomments() 
                
            

               
      
            }
            if(data.code==400){
                alert.error(data.msg)
                
    setDisplay('block')

           

                
            }if(data.code===401){
            
                alert.error("Opss!!! Something went wrong. Redirecting to login page!")
                setTimeout(()=>{
                    
                    localStorage.removeItem("token")
                },2000)
           
        

            }if(data.code == 429){
                
                alert.error(data.msg)
                setDisplay('block')

            }
    })
    setInterval(()=>{
        setDisplay('block')
    },10000)
        



}




    async function fetchPost(){
   
       await fetch(uri+'/api/post/'+pid)
       .then(res=>res.json())
       .then(data=>{
           if(data.length>0){
        
            setData(data)
                if(showSupport){
                    window.scrollTo(0, 130)
                }

            
   

           }else{

               window.location.href='/'
               
           
            }
  

       })


       
    }






  return (
    <div className='container fixheight'>

<Helmet>
           
    
           <meta property="og:title"    content={data?.length>0?data[0].cat:''}/>
           <title>{data?.length>0?data[0].cat+' | Confess24':'loading...'} </title>

               </Helmet>
        <div className="row">
            <div className="col-lg-9 bak">
            {showSupport? <Support/>:null}
                <div className="content-side">
                    {
                        data?.length>0?<PostContentCard content={data}/>: <PostLoader />
                      
                    }
                </div>
                <div className="comments-side">
{
                    
                loading?null:

                    <h2> {dcomment?.length>0?dcomment?.length +' Comments ':'No Comments'}</h2>}




{

    loading?'':
    isAuthenticated?
    <div className="geda">
          

    <MentionsInput placeholder='Write your comment. Use @ to mention someone.' value={comment}  style={DefaultStyle}  onChange={(e)=>setComment(e.target.value)}>

        <Mention style={{backgroundColor:'rgb(255 117 158)'}}
            trigger="@"
            data={getUserMention}

          
        />




        </MentionsInput>


    <button style={{display:display}}  onClick={commentPost}>SUBMIT</button>




    </div>:<LoginAss/>

}


                  
                </div>
             

                        {
                                loading?<LoadingComment/>:
                            dcomment?.length>0?
                            dcomment.map((x=>{
                                return(

                                    <Comments key={x.commentID} commentID= {x?.commentID} gender={x.gender} user = {x.user} content={x.content} time={x.commentedOn}/>
                                )
                            }))
                            :''
                        }
                       
               
      
            </div>
            <div className="col-lg-3 bak">  
               <div className="related-side">
                   <div className="related-title">
                       <h1>ALSO SEE</h1>

                        {
                            
                            sidedata?.length>0?
                            sidedata.map((p=>{
                                return(
                                    
                                         
                                                <Link to ={'/post/'+p.id} >
                                        
                                    
                                                    <Relatedcard content={p.content} cat={p.cat}  />


                                                </Link>
                                             
                                                
                                          

                                        )
                                    }))
                                
                                : <><Related/><Related/><Related/><Related/><Related/><Related/><Related/></>

                        }

                    
                   </div>
               </div>
            </div>
        </div>
    </div>
  )
}

export default Post



function LoadingComment(){
        return(
            <div className="spinner-center" style={{textAlign:'center',marginTop:'65px'}} >
            <Spinner animation="border" role="status" size='lg'>
            <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>

        )
}


function LoginAss(){
    return(
        <div className="signup-comment">
            <h3>

           Create your account in just 10 seconds to comment!
            </h3>
            <div className="signup-comment-btn">
                <Link to={'/signup'}>
                <button> SIGNUP NOW</button>
                </Link>
            </div>

        </div>
    )
}