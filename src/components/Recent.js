import React from 'react'
import {AiOutlineClockCircle,AiOutlineComment,AiFillFire} from 'react-icons/ai'
import {FaEye} from 'react-icons/fa'

function Recent(props) {
var geda
if(props.indicator==='FaEye'){
    geda = <FaEye/>
}

if(props.indicator==='AiOutlineClockCircle'){
  geda = <AiOutlineClockCircle/>
}

if(props.indicator==='AiOutlineComment'){
  geda = <AiOutlineComment/>
}

if(props.indicator==='AiFillFire'){
  geda = <AiFillFire/>
}





  return (
    <div>
        <div className="trending-title">
         <h2> 
            <span>
                {geda}
           </span> {props.title}</h2>
        </div>
    </div>
  )
}

export default Recent