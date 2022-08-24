import React from 'react'
import Loginqr from './Loginqr'
import Loginmodel from './Loginmodel'
import Helmet from 'react-helmet'
function Login() {

  return (

    <div className='back-wrapper'>
      <Helmet>
<title>Login</title>

</Helmet>
        <div className="container-fluid fixheight">
            <div className="row">
                <div className="col-lg-6 bo">
               <Loginqr/>
                </div>
                
                <div className="col-lg-6">
            <Loginmodel/>

   
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login