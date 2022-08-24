import React,{useEffect,useState,useRef} from 'react'
import {AiFillDelete} from 'react-icons/ai'
import {FiExternalLink} from 'react-icons/fi'
import {BiCommentDots,BiTime} from 'react-icons/bi'
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom'
import moment from 'moment'
import { Spinner } from 'react-bootstrap';
import {useAlert} from "react-alert"
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import Helmet from 'react-helmet';
import Uri from "./Uri";
import Eye from './eye.png'
import Smoke from './smoke.jpg'
import Comment from './comment.jpg'


function Profile() {
  var uri = Uri.uri ?Uri.uri :'' 

const alert = useAlert()
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const [uid,setUid] = useState(null)
  //values 
const [data,setData] = useState('')

// all confessions

const [mloading,setMloading]= useState(false)
const [myconfessoion,setMyconfession]= useState()
const [confPage,setConfPage]= useState(1)
const [totalconf,setTotalconf] = useState()
const myRef = useRef(null)
const executeScroll = () => myRef.current.scrollIntoView()    
useEffect(()=>{
  getAllconfessions()
},[confPage])

// all recent activities
const rmyRef = useRef(null)
const rexecuteScroll = () => rmyRef.current.scrollIntoView()    
const [rloading,setRmloading]= useState(false)
const [rconfessoion,setRmyconfession]= useState() 
const [rconfPage,setRconfPage]= useState(1)
const [rtotalconf,setRtotalconf] = useState()

useEffect(()=>{
  getAllrecentActivities()
},[rconfPage])

useEffect(()=>{
  
  window.scrollTo(0,0.1)
  const isAuthenticated = !!localStorage.getItem("token");
  try {

    if(!isAuthenticated){
      window.location.href("/login")
      localStorage.removeItem("token")

    }else{
      setUid(jwt_decode(localStorage.getItem("token")))
      }

  } catch (error) {
      window.location.href="/login"
      localStorage.removeItem("token")
  }
  getUsermeta() 
},[])




async function deletee(e){
  Confirm.show(
    'Delete  Confession ?',
    'Are you sure you wanted to delete this Confession ?',
    'Yes',
    'No',
    async function okCb() {
      await fetch(uri+'/api/delete/'+e,{
        method:"DELETE"  
        ,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        })
                
        if(sessionStorage.getItem("data")){
          sessionStorage.clear();
         }
      alert.success("Confession Deleted!")
      getAllconfessions()

                
    },
    function cancelCb() {
      
    },
    {
      width: '320px',
      borderRadius: '5px',
      // etc...
    },);



  



}


async function getUsermeta(){
  setLoading(true)
    await fetch(uri+'/api/usermeta',{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.code ==200){
        setLoading(false)
        setData(data)
      }
      if(data.code ==401){
        try {
          localStorage.removeItem("token")
          window.location.href='/login'
        } catch (error) {
          window.location.href='/login'
          
        }
      }
      setLoading(false)

    })
}


async function getAllconfessions(){
  setMyconfession(0)
  setMloading(true)
    await fetch(uri+`/api/myconfessions?limit=7&page=${confPage}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    })
    .then(res=>res.json())
    .then(data=>{
      
      if(data){
        setLoading(false)

          setMyconfession(data.post)
          setTotalconf(data.totalPage)

  
      }
    
      setMloading(false)
    })
  }


  async function getAllrecentActivities(){
    setRmyconfession(0)
    setRmloading(true)
      await fetch(uri+`/api/mycomments?limit=15&page=${rconfPage}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      })
      .then(res=>res.json())
      .then(data=>{
        
        if(data){
          setRmloading(false)
          setRmyconfession(data.post)
          setRtotalconf(data.totalPage)
        }
      
        setRmloading(false)
      })
    }


  return (
    <div className='container fixheight'>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="settings-area">

        <div className="profile-area">
   
        </div>

      <div className="setting-title">
         <h1>  WELCOME , <span style={{fontSize:'30px',color:'pink'}}>{uid?.user}</span></h1>
      

          <div className="analy">
              
            <div className="row">



              <div className="col-lg-4">
              <div className="alal-box" style={{backgroundImage:`url('${Smoke}')`}}>

              
              <h3>{data?.tc>=0?data.tc:'🤔'}</h3>
              <h5>TIMES CONFESSED SO FAR </h5>
              
              </div>
              </div>

              <div className="col-lg-4">
              <div className="alal-box " style={{backgroundImage:`url('${Eye}')`}}>
              <h3>{data?.tv>=0?data.tv:'🤔'}</h3>
              <h5> VIEWS GAINED IN TOTAL </h5>
                </div>
                </div>
       
              <div className="col-lg-4">
              <div className="alal-box" style={{backgroundImage:`url('${Comment}')`}}>

              <h3>{data?.tc>=0?data.cc:'🤔'}</h3>
              <h5>COMMENTS YOU HAVE COMMENTED</h5>
                
               
              </div>
              </div>
              
            </div>
          </div>


         <h2 ref={myRef}>  MY CONFESSIONS</h2>
        </div>

      <div className="confessions-list-settings" >
       
{


  totalconf<=0?<Nopost msg={mloading?<LoadingComment/>:<h6>You haven't confessed anything yet!
  </h6>}/>:

  myconfessoion?


  myconfessoion.map((e=>{
        return(
          <div  className="lists-in d-flex">    
      
          <div  className="title-in">
            <p>

              {e.content.length>180?e.content.slice(0,180)+'......':e.content}
            </p>
          </div>


          <div className="edit-in">
            <span onClick={()=>deletee(e.id)}><AiFillDelete/></span>
            <span onClick={()=>navigate(`/post/${e.id}`)}><FiExternalLink/></span>
           
          </div>
      </div>
        )

      })):<LoadingComment/>

}
{
  
}

<div className="pagination-page" >

{
mloading?null:
  [...Array(totalconf)].map((x, i) =>
  {
          i=i+1;
          return(
              
              <span style={{backgroundColor:confPage===i?'red':'rgb(21, 3, 29)'}} onClick={()=>{setConfPage(i);executeScroll()}} className='p-3'>
                

                         {i}
             
                      
                </span>

     


          )
        }
    )


}
</div>








</div>












<div className="setting-title" ref={rmyRef}>
<h2  > 
RECENT ACTIVITIES
 </h2>

</div>



         <div className="token-box">

 <div className="sec-wrap">
   <div className="ttbox">



{
    rtotalconf<=0?
    <Nopost msg={<h6>No recent activities found!</h6>}/>:
rconfessoion?
rconfessoion.map((p=>{
      return(
        <div  className="lists-in d-flex">    

        <div className="comment-acti">
          <h3>You commented on {'#'+p.postID} </h3>
          <p>
          <BiCommentDots/>  {p.content.replace('<span>','').replace('</span>','')}
          </p>
          
         <span> <BiTime/> </span>  <span> {moment(p.commentedOn).startOf('minutes').fromNow()}</span>
        </div>
        <div className="edit-in">

          <span onClick={()=>navigate(`/post/`+p.postID)}><FiExternalLink/></span>
         
        </div>
    </div>
      )
    })): <LoadingComment/>
}
<div className="pagination-page" >

{
rloading?null:
  [...Array(rtotalconf)].map((x, i) =>
  {
          i=i+1;
          return(
              
              <span style={{backgroundColor:rconfPage===i?'red':'rgb(21, 3, 29)'}} onClick={()=>{setRconfPage(i);rexecuteScroll()}} className='p-3'>
                

                         {i}
             
                      
                </span>

     


          )
        }
    )


}
</div>
   </div>

 </div>

</div>


      </div>

      </div>
  
  )
}

export default Profile


function Nopost(e){
  return(
    <div  style={{marginTop:'100px',textAlign:'center',marginBottom:'100px'}} className="nopost">
     <h1>{e.msg}</h1>   
    </div>
  )
}


function LoadingComment(){
  return(
      <div className="spinner-center" style={{textAlign:'center',marginTop:'65px',    marginBottom:' 50px'}} >
      <Spinner animation="border" role="status" size='lg'>
      <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>

  )
}
