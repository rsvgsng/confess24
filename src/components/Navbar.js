import React, { useEffect, useState,useRef } from "react";
import { ImConfused2 } from "react-icons/im";
import { FaSadCry } from "react-icons/fa";
import { ImHeartBroken,ImInfo } from "react-icons/im";
import { BsFillEmojiDizzyFill } from "react-icons/bs";
import { BsEmojiWinkFill } from "react-icons/bs";
import { BsFillEmojiHeartEyesFill } from "react-icons/bs";
import { BsFillEmojiSmileUpsideDownFill } from "react-icons/bs";
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { MdOutlineCreate,MdOutlineHome ,MdOutlineNotifications,MdNotifications} from "react-icons/md";
import {GoSignOut} from 'react-icons/go'
import { FiLogIn } from "react-icons/fi";
import moment from 'moment'
import { CgProfile } from "react-icons/cg"; 
import { BiCategoryAlt,BiCommentDots } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import {useAlert} from "react-alert"

import Uri from './Uri'

var uri = Uri.uri ?Uri.uri :'' 


function Navbar() {


  const refOne= useRef(null)

  const alert = useAlert()









  useEffect(() => {
  
    
    if(isAuthenticated){
        fetchNotification()
      }


  }, [])


  



  
  useEffect(() => {





    document.addEventListener('click',handelClick,true)



  
  }, [])



  async function clearAll(){



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
      }
          
    })

  }









      function handelClick(e){
        if(!refOne.current.contains(e.target)){
          setIsOff(false)
        }
      }

        const [noti,setNoti] = useState()
        const isAuthenticated = !!localStorage.getItem("token");
        const [isOff, setIsOff] = useState(false);
        var [unread,setUnread] = useState()

        function logout(){
          Confirm.show(
            'Logout  ?',
            'Are you sure you want to logout ?',
            'Yes',
            'No',
            async function okCb() {

                localStorage.removeItem("token")
                window.location.href = '/'
                        
            },
            function cancelCb() {
              
            },
            {
              width: '320px',
              borderRadius: '5px',
              // etc...
            },);
         
        }


        async function fetchNotification(){
          fetch(uri+'/api/notifications',{
            method:'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          })
          .then(res=>res.json())
          .then(data=>{

          if(data.code===401){
            localStorage.removeItem("token")
            alert.error("Something went wrong!!!!")
            setTimeout(()=>{  
              window.location.reload()
            },3000)
          }
            if(data.length>0){

              setNoti(data)
            }
            var count = 0
              data.map((x=>
                {
                    if(x.seen === false){
                      count = count+1
               
                    }


                    if(count>0){
                      document.title=`(${count}) Confess24`   

                    }
  
                    setUnread(count)
                    

                }))
              
          })

        }
          useEffect(() => {
     

            var force = setInterval(()=>{
              if(isAuthenticated){
           
                fetchNotification()




              }
            },7000)
            return () => {
              clearInterval(force);
            }
          }, [])
          







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




        return (
    <div className="container-fluid nav-stick" style={{ backgroundColor: "#15031D" }}>
      <div className="navbarr">
        <div className="row">
          {/* navactive */}
          <div className=" col-md-12 col-sm-12 col-lg-5 bak center">
            <ul className="rulnav">
            
          
              <NavLink to={"/"}  className={({ isActive }) =>
              isActive ? 'navactive' : undefined
            }>
              <li>
                        
                        
              HOME
                        
              </li>
                        </NavLink>

            {
                 isAuthenticated? 
                 
                 
                 <>
                          <NavLink to={"/profile"}  className={({ isActive }) =>
                 isActive ? 'navactive' : undefined
               }>
                 <li>
                           
                           
                 PROFILE
                           
                 </li>
                          
                           </NavLink>




                     
                 <li onClick={logout}>
                           
                           
                            LOGOUT
                           
                 </li>
                   
                 
                 </>
        
                           
                           
                           
                           
                           
                           
                           :
                 <>
              <NavLink to={"/signup"}  className={({ isActive }) =>
              isActive ? 'navactive' : undefined
            }>
              <li>
                        
                        
                        SIGNUP
                        
              </li>
                        </NavLink>






                <NavLink to={"/login"}  className={({ isActive }) =>
              isActive ? 'navactive' : undefined
            }>
              <li>
                        
                        
                        LOGIN
                        
              </li>
                        </NavLink>
                 </>
            }


      


{isAuthenticated?


<div className={unread>0?'fuck noti-active':'fuck'}>
<li  onClick={() => setIsOff(!isOff)} >

<div className={unread>0?'bell-bell':'bell'}>
< MdOutlineNotifications/>{unread===0?'': <span>{unread}</span> }

</div>

</li>
<div className="notiwrapper"  ref= { refOne} onClick={()=>setIsOff(false)}  style={{top:isOff ? '8%' : '-1000%'}}>

    <div className="row nwp" style={{padding:"8px",paddingRight:"0px",alignItems:'center'}}>
      <div className="col-lg-6 p-1">
        <div className="noti-title">
        <h3>Notifications</h3>

        </div>
        </div>
      <div className="col-lg-6 p-1" style={{textAlign:'end'}}>
        <div className="clearbtn">
          <button onClick={clearAll}>Mark all as read</button>
        </div>

 
     </div>
     </div>

      <hr />
        <div className="row" style={{zIndex:'9999999999999999999999' , padding:'0px'}}>
            <div className="comment-container">

                <ul>
                  {
                    noti?.length>0?
                    noti.map((x=>{

                      return(
                           <a  key={x.id} onClick={()=>removeSeen(x._id , x.postID)}>

                             <li className={x.seen?'':'notseen'} >{
                             x.msg
                          
                            }
                            {
                              x?.comment?
                              <div className="comment-noti-desktop">

                       
                    
                             
                              <BiCommentDots/>
                            
                              <span  >{x.comment.length>=50?x.comment
                           .split('<span>').join('')
                           .split('</span>').join('')
                              
                              
                              
                              
                              +'...':x.comment
                              .split('<span>').join('')
                              .split('</span>').join('')}
                              
                              </span>
                              </div>
                              
                              :''
                            }
                    
                           
                            
                            
                            
                            <span className="dateNoti">{ moment(x.date).startOf('minutes').fromNow()} </span></li>
                         
                           </a>

                      )
                    })):'No new notifications'
                  }
                 
               
                </ul>
            </div>
        </div>
    </div>

         

</div>

:''}
              









            </ul>
          </div>

          <div className=" col-md-12 col-sm-12 col-lg-2 bak">
          <NavLink to={"/"}>    <h1>CONFESS24</h1> </NavLink>
          </div>

          <div className="col-md-12 col-sm-12 col-lg-5  bak center">
                  <Link to ={'/create'}>
            <h2>CREATE CONFESSION</h2>
                  </Link>
                  
          </div>
        </div>
      </div>

      <div className="navbarr-below container-fluid">
        <div className="row">
          <ul className="below-nav">
              <a href={'/category/cato0'} >
            <li>
              <span>
                <ImConfused2 />
              </span>{" "}
              <span>a confusion</span>
            </li>
            </a>

            <a href={'/category/cato1'} >

            <li>
              <span>
                <FaSadCry />
              </span>{" "}
              <span>a problem</span>
            </li>
            </a>



            <a href={'/category/cato2'} >

            <li>
              <span>
                <ImHeartBroken />
              </span>{" "}
              <span>a pain</span>
            </li>


            </a>

            <a href={'/category/cato3'} >

            <li>
              <span>
                <BsFillEmojiDizzyFill />
              </span>{" "}
              <span>an experience</span>
            </li>
            </a>


            <a href={'/category/cato4'} >

            <li>
              <span>
                <BsEmojiWinkFill />
              </span>{" "}
              <span>a feeling</span>
            </li>
            </a>


            <a href={'/category/cato5'} >

            <li>
              <span>
                <BsFillEmojiHeartEyesFill />
              </span>{" "}
              <span>a habit</span>
            </li>
            </a>

            <a href={'/category/cato6'} >

            <li>
              <span>
                <BsFillEmojiSmileUpsideDownFill />
              </span>{" "}
              <span>others</span>
            </li>
          </a>

          </ul>
        </div>
      </div>













      <div className="phone-nav" style={{ display: "none" }}>

        <div className="row">
          <div className="col-6 rightm">
     
          <NavLink to={"/"} >

            <h1>CONFESS24</h1>
          </NavLink>
      
          </div>
          <div className="col-6 leftm">
 

     <a onClick={logout} >  {isAuthenticated?<GoSignOut/>:null}</a>     



          </div>
        </div>
        <div className="nav-btns">
            <div className="row">
            <div className="col">

            <NavLink to={"/"}  className={({ isActive }) =>
                 isActive ? 'activephn' : undefined
               }>
            <MdOutlineHome/>
             </NavLink>





              </div>



              <div className="col">


              <NavLink to={"/profile"}  className={({ isActive }) =>
                 isActive ? 'activephn' : undefined
               }>
             {isAuthenticated ?< CgProfile/>:<FiLogIn/>} 
             </NavLink>
            
              </div>
              
              
              
              {


                isAuthenticated?
                
                <div className= {unread>0?'col phnnoti activepnoti':'col phnnoti'}>
               
               <NavLink to={"/notifications"}  className={({ isActive }) =>
                 isActive ? 'activephn' : undefined
               }>
         <MdNotifications/>
             </NavLink>


{unread===0?'':<span>{unread}</span> }
                </div>
                
                :null


              }

         





              <div className="col">

              <NavLink to={"/phonecategory"}  className={({ isActive }) =>
                 isActive ? 'activephn' : undefined
               }>
           <BiCategoryAlt/>
             </NavLink>






              </div>
              <div className="col">

              <NavLink to={"/create"}  className={({ isActive }) =>
                 isActive ? 'activephn' : undefined
               }>
      {isAuthenticated?<  MdOutlineCreate/>:<ImInfo/>}
             </NavLink>




              </div>
            </div>
        </div>
      </div>














    </div>




  );
}

export default Navbar;
