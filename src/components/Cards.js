import React from 'react'
import {FiEye} from 'react-icons/fi'
import {AiOutlineComment} from 'react-icons/ai'
import moment from 'moment'

function Cards(data) {
  function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}
    
  return (
    <div className='c-cards'>
        <h2 className='cat-card'>
       {data.cat}

        </h2>
        <p>
          {data.content.length >256 ? data.content.slice(0,200)+'.....':data.content }
        </p>
        <div className="meta-card">
          
                    <ul>
                        <li>
               
                        <p>
                        { moment(data.date).startOf('minutes').fromNow()} 
                        </p>
                        </li>
              
                        <li>
                        <AiOutlineComment/> <span style={{marginRight:'15px'}}>{data.comments}</span>
                       
                        <FiEye/> <span>{kFormatter(data.views)}</span>
                        </li>
                    </ul>
                   
             
            
                   
            
          
        </div>

    </div>
  )
}

export default Cards