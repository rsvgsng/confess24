import React from 'react'


function Signupqr(props) {

const {qr,token} = props
  return (
 
         <div className="right-contents">
                        <div className="qr">
                         
                            <img className='img-fluid' src={qr} alt="" srcset="" />

                           
                        </div>
                    
                        <div className="desc-account">
                            <h1>ACCOUNT CREATED SUCCESSFULLY!</h1>
                            <a href={qr} download>
                                <button className='download-btn'>DOWNLOAD QR CODE</button>
                                </a>
                                <h4>Or use the below access key to login. If you lose your access key or the qr code there is no way getting your account back.</h4>
                                <h6>{token}</h6>
                        </div>
                    </div>

  )
}

export default Signupqr