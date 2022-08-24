import React, { useEffect,useState } from 'react'

import { Confirm } from 'notiflix/build/notiflix-confirm-aio';

import moment from 'moment'
import Pink from './pink.jpg'
import Blue from './blue.jpg'
import Xakka from './other.jpg'
import jd from "jwt-decode"
import Uri from './Uri'
import { useAlert } from 'react-alert'

import {AiFillDelete} from 'react-icons/ai'

function Comments(props) {

    const alert = useAlert()

    var {content,user,time,gender,commentID}= props

    var uri = Uri.uri ?Uri.uri :'' 


    async function deleteCmt(){
       
        Confirm.show(
            'Delete the comment ?',
            'Are you sure you wanted to delete the comment ?',
            'Yes',
            'No',
            async function okCb() {

             
                    await fetch(uri+'/api/delete/comment/'+commentID,{
                        method:'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }

                    })
                    .then(res=>res.json())
                    .then(  data=>{
                        try {
                            if(data.code === 200){
                                
                                alert.success("Comment Deleted")
                                setTimeout(()=>{
                                    window.location.reload();

                                },500)
                                
                            }
                            if(data.code===404){
                                alert.error("Comment not found")
                            }
                        } catch (error) {
                            alert.error("Comment not found")
                            
                        }
                    })
                    
            },
            function cancelCb() {
              
            },
            {
              width: '320px',
              borderRadius: '5px',
              // etc...
            },);
    }
    
        const [hig,setHig] =useState('')
    

    var lado 

    if(gender ==="Female"){
        lado = Pink
    }
    if(gender ==="Male"){
        lado = Blue
    }
    if(gender ==="Other"){
        lado = Xakka
    }

    useEffect(()=>{
        if(localStorage.getItem("token")){
            var token = localStorage.getItem("token")
            setHig(jd(token))

        }

    },[])
  return (
    <div  className={hig.user === user?' comment-lists currentuserComment':'comment-lists'}>
       

            <div className="row">
         
                <div className="col-lg-1 col-12 ">
          
                <div className="dp">
                <img className='img-fluid' src={lado}  />
            </div>
                </div>
                <div className="col-lg-11 col-12">

                <div className="uid d-flex" style={{placeContent:'space-between'}}>
                    <p style={{wordBreak :'breakWord'}}>{user} </p>

                    {
                    hig.user === user?



                    <div className="deleteCmt">
                <AiFillDelete onClick={()=>deleteCmt()}/>
            </div>:''
                                    }



            </div>
            <div className="comment">
    

                <p
                
                dangerouslySetInnerHTML={{
                    __html:content
                  }}
                >
        
                   
                </p>
         
                <span className='time-comment'>{moment(time).startOf('minutes').fromNow() } </span>

            </div>
                </div>
           
            </div>
          
          

    </div>
  )
}

export default Comments