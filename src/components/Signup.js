import React,{ useState,useRef,useEffect} from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha';
import {useAlert} from "react-alert"
import Signupqr from './Signupqr'
import Uri from './Uri';
import Loginmodel from './Loginmodel'
import Helmet from 'react-helmet';

function Signup() {
  const [gender,setGender] = useState(0)
  const [loading,setLoading] =useState(false)
  const [valid,setValid] = useState(false)
  const [data,setData] =useState()
  const [ctoken,setcToken] = useState('')
  const captcha = useRef()
  const alert = useAlert()


 
useEffect(() => {
  window.scrollTo(0,0)
  
}, [])



  async function Signup(){
    var uri = Uri.uri ?Uri.uri :'' 

      if(!ctoken){
        alert.error("Please Verify the captcha")

      }else{

        setLoading(true) 
    
        await  fetch((uri+'/api/auth/signup'),{
          
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            gender:gender,       
            ctoken:ctoken
            
          })
        })
        .then(res=>res.json())
        .then(data=>{
        
          
          if(data.code === 200){
            setValid(true)
      
            setData(data)
            window.scroll(0,0)
          }
          if(data.code === 401){
            alert.error("Invalid Token")
        }
        if(data.code === 429){
          alert.error(data.msg)
        }
          setLoading(false) 
          
          
        })
      }}

  return (
    <div className='back-wrapper '>
         <Helmet>
<title>Signup</title>

</Helmet>
        <div className="container-fluid fixheight">
            <div className="row">
                <div className=" col-xs-12 col-lg-7 ">

                  {
                    valid?
                    <Signupqr token = {data?.token} qr={data?.qr}/>:<Greet/>
                  }
                </div>
                <div className="col-xs-12 col-lg-5  ">




                    {
                      valid?<Loginmodel/>:
                      <div className="left-contents">



                      <div className="signup-model">
                              <div className="sing-ttl">
                                  <h2>SIGN UP</h2>
                              </div>
                                <div className="wrapper-signup">
                                    <div className="options mb-4">
                                        <h3>Select your gender</h3>
                                        <select onChange={(e)=>setGender(e.target.value)}>
                                          <option value="0" selected >Male</option>
                                          <option value="1" >Female</option>
                                          <option value="2" >Other</option>
                                        </select>
                                     
                                    </div>
                                    <HCaptcha 
                        ref={captcha}
                        sitekey="8c9a36ac-d7ac-4b30-a62d-747d33c39035"
                        onVerify={ctoken=>setcToken(ctoken)}
                        onExpire={(e)=>setcToken(" ")}
                      />
                                   <div className="signup-btn">
                          

                                       <h2  onClick={Signup}>{loading?"Loading":"SIGNUP"}</h2>
                                   </div>
                   
                                </div>
                          
  
                          </div>   
  
                  </div>
                    }

              









                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup


function Greet(){
  return(
    <div className="right-contents">
    <div className="qr">
    
       


    </div>

    <div className="desc-account" style={{textAlign:'left',marginTop:'100px'}}>
      
        <h2>WELCOME TO SINGUP PAGE. </h2>
        <h2>TO CONFESS OR TO COMMENT YOU MUST HAVE AN ACCOUNT. </h2>
        <h3>YOU DONT NEED TO SET EMAILS OR PASSWORD TO REGISTER.  </h3>

       
           
    </div>
</div>
  )
}