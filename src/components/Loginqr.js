import React,{useRef} from 'react'
import {ImQrcode} from 'react-icons/im'
import QrScanner from 'qr-scanner';
import {useAlert} from "react-alert"

import Uri from "./Uri";
function Loginqr() {
const alert = useAlert()

  var uri = Uri.uri ?Uri.uri :'' 
  const hiddenFileInput = useRef(null)

  
  const handleClick = (e) => {
    hiddenFileInput.current.click();
    
  };

  async function filechange(e){
      try {
        
      } catch (error) {
        
      }
        QrScanner.scanImage(e.target.files[0])
        .then(async result  =>{
         var tokenn = (`{"token":"${result}"}`)
      
            const response = await fetch(uri+'/api/auth/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  token:JSON.parse(tokenn).token
          
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
            
            
        })

        .catch(error => alert.error("No valid qr found!"));
            
  }


  return (

    <div className="right-contents-login" onClick={handleClick}>
                        <div className="qr">
                            <ImQrcode/>

                        </div>
                        <div className="desc-account" onClick={handleClick}>
                          <input type="file" style={{display:"none"}}    onChange={filechange}      ref={hiddenFileInput}  id="" />
                            <h1 >CLICK TO UPLOAD YOUR QR CODE</h1>
                     
                         </div>
                    </div>

  )
}

export default Loginqr