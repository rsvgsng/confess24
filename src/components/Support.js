import React from 'react'

function Support() {
  return (

      <a  target={'_blank'} href="https://www.buymeacoffee.com/rsvv">
                <div className="coffee">

        <p>You can support us by buying a coffee. Since we do not run any type of ADS . There is no income  for us and it is very difficult for us to keep this site alive.  </p>
        <img  className='img-fluid' src={require('./bmac.svg').default} alt="" srcset="" />
                </div>
        </a>

  )
}

export default Support