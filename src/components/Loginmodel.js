import React, { useState ,useRef} from 'react'


import {useAlert} from "react-alert"
import { Link } from 'react-router-dom';
import Uri from "./Uri";

function Loginmodel() {
  var uri = Uri.uri ?Uri.uri :'' 

const [token,setToken] =useState('')
const [loading,setLoading] = useState(false)

const captcha = useRef()

const alert = useAlert()

  async function loginValidate(){
      setLoading(true)
      const response = await fetch(uri+'/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token:token
          
        })
  
      })

  
      const data = await response.json()
    if(data.code === 401){
        alert.error("Invalid Token")
    }
    if(data.code === 429){
      alert.error(data.msg)
    }
    if(data.code ===200 ){
      alert.success("Login Successfull! ")

        window.location.href='/'
       
        localStorage.setItem("token",data.jwt)
        
 
    }
    
    setLoading(false)
  
      

    


















}


  return (
    
        <div className="left-contents">



                    <div className="signup-model">
                            <div className="sing-ttl">
                                <h2>LOGIN WITH KEY</h2>
                            </div>
                              <div className="wrapper-signup">
                                  <div className="options">
                                      <h3>Enter your access key</h3>
                                        <input  onChange={(e)=>setToken(e.target.value)} type="text" />
                                   
                                  </div>


                                 <div className="signup-btn">
                                     <h2 onClick={loginValidate}>{loading?"Loading":'LOGIN'}</h2>
                                 </div>
                              </div>
                              
                                <div className="phn-signup" style={{display:"none"}}>
                                          <h2>OR</h2>
                                          <div className="signup-btn">
                                  <Link to={'/signup'}>   <h2 > SIGNUP</h2></Link>
                                 </div>
                                </div>
                        </div>

    </div>
  )
}

export default Loginmodel