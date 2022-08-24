import React,{useEffect,useState} from 'react'
import Uri from './Uri'
import moment from 'moment'
import Notificationsk from './Skeletons/Notificationsk'
import {BiCommentDots} from 'react-icons/bi'
import Helmet from 'react-helmet'
function PhoneNoti() {
    
  

    
    var uri = Uri.uri ?Uri.uri :'' 
    const [noti,setNoti] = useState()
    const [loading,setLoading] = useState(false)
    const [seenmsg,setSeenmsg] = useState(true)    
    useEffect(()=>{
        fetchNotification()
    window.scrollTo(0,0)

    },[])
  
  async function removeSeen(e,y){
    await fetch(uri+'/api/noti/seen/'+e,{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    })

    .then(res=>res.json())
    .then(data=>{
      if(data.code === 200){
          
        window.location.href='/post/'+y
      }
    })

  }


  async function fetchNotification(){
      setLoading(true)
      fetch(uri+'/api/notifications',{
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.length>0){
          setNoti(data)
          data.map(e=>{
            if(!e.seen){
            
              setSeenmsg(false)

            }}            
            )

        }
        
        setLoading(false)
    })

  }


  async function clearAll(){


    setNoti('')
    fetch(uri+'/api/noti/clear',{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    })

    .then(res=>res.json())
    .then(data=>{

      if(data.code===200){
        fetchNotification()
               
        setSeenmsg(false) 
      }
          
    })

  }

  return (
      <div className="container fixheight">

<Helmet>
        <title>Notifications</title>
      </Helmet>
        <div className="row" >

{


  seenmsg?'':

  <div className="clearbtn-phone">

  <button onClick={clearAll}>Mark all as read</button>

  <hr />

</div>


}


            <div className="phnenoti">

                <ul>
                  {
                   noti?.length>0?
                    noti.map((x=>{

                      return(
                           <a key={x.id} onClick={()=>removeSeen(x?._id , x?.postID)}>

                             <li className={x.seen?'phnnotis ':'phnnotis notseen'} ><p className='mt-3'>{x.msg}</p>
                            
                            
                            {
                                    x?.comment?
                                    <div className="comment-noti">
                                    <BiCommentDots/>
                                   
                                   <span  >{x.comment?.length>=50?x.comment
                           .split('<span>').join('')
                           .split('</span>').join(''):x.comment
                           .split('<span>').join('')
                           .split('</span>').join('')} </span>
                                    </div>:null


                            }
                            
                             
                             <span className="dateNoti">{ moment(x.date).startOf('minutes').fromNow()} </span></li>
                         
                           </a>

                      )
                    })):loading?<><Notificationsk/><Notificationsk/><Notificationsk/><Notificationsk/><Notificationsk/><Notificationsk/></>:<p style={{textAlign:'center'}}>No notifications yet! 😁</p>
                  }
               
                </ul>
            </div>
            </div>     </div>
  )
}

export default PhoneNoti