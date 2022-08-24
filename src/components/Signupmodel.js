import React,{useEffect, useState} from 'react'

function Signupmodel() {

  const [gender,setGender] = useState(0)
  const [loading,setLoading] =useState(false)
  const [valid,setValid] = useState(false)




const api ='/auth/signup'


  async function Signup(){
    
     setLoading(true) 
    
    await  fetch(api,{
      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gender:gender
        
      })
    })

      .then(res=>res.json())
      .then(data=>{
     
        setLoading(false)  
      })


    



  } 
  return (
    
        <div className="left-contents">



                    <div className="signup-model">
                            <div className="sing-ttl">
                                <h2>SIGN UP</h2>
                            </div>
                              <div className="wrapper-signup">
                                  <div className="options">
                                      <h3>Select your gender</h3>
                                      <select onChange={(e)=>setGender(e.target.value)}>
                                        <option value="0 "selected >Male</option>
                                        <option value="1" >Female</option>
                                        <option value="2" >Other</option>
                                      </select>
                                   
                                  </div>
                                 <div className="signup-btn">
                                     <h2 onClick={Signup}>{loading?"Loading":"SIGNUP"}</h2>
                                 </div>
                              </div>
                        

                        </div>   

    </div>
  )
}

export default Signupmodel