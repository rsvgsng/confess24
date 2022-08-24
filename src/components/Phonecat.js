import React,{useEffect} from 'react'
import { ImConfused2 } from "react-icons/im";
import { FaSadCry } from "react-icons/fa";
import { ImHeartBroken } from "react-icons/im";
import { BsFillEmojiDizzyFill } from "react-icons/bs";
import { BsEmojiWinkFill } from "react-icons/bs";
import { BsFillEmojiHeartEyesFill } from "react-icons/bs";
import { BsFillEmojiSmileUpsideDownFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
function Phonecat() {
        useEffect(() => {
                window.scroll(0,0)
        }, [])
        
  return (

    <div className='container'>
      <Helmet>
        <title>Categories</title>
      </Helmet>
    
                <div className="phone-cat">


                  <div className="row">


                    <div className="col-6">
                                <Link to ={'/category/cato0'}>
                    <div className="cat-block">
                            <ImConfused2/>
                            <h3>a  confusion</h3>

                    
                    
                    </div>
                                </Link>
                    </div>

                          
                    <div className="col-6">
                    <Link to ={'/category/cato1'}>
                    <div className="cat-block">
                            <FaSadCry/>
                            <h3>a problem</h3>
                    </div>
                            </Link>
                    </div>


                          
                    <div className="col-6">
                    <Link to ={'/category/cato2'}>
                    <div className="cat-block">
                            <ImHeartBroken/>
                            <h3>a pain</h3>
                    </div>
                            </Link>
                    </div>


                          
                    <div className="col-6">
                    <Link to ={'/category/cato3'}>
                    <div className="cat-block">
                            <BsFillEmojiDizzyFill/>
                            <h3>an experience</h3>
                    </div>
                            </Link>
                    </div>


                          
                    <div className="col-6">
                    <Link to ={'/category/cato4'}>
                    <div className="cat-block">

                            <BsEmojiWinkFill/>
                            <h3>a feeling</h3>
                    </div>
                        </Link>
                    </div>


                          
                    <div className="col-6">
                    <Link to ={'/category/cato5'}>
                    <div className="cat-block">

                            <BsFillEmojiHeartEyesFill/>
                            <h3>a habit</h3>
                    </div>
                        </Link>
                    </div>
               
                      
                    <div className="col-6">
                    <Link to ={'/category/cato6'}>
                    <div className="cat-block">

                            <BsFillEmojiSmileUpsideDownFill/>
                            <h3>others</h3>
                    </div>
                        </Link>
                    </div>
                  </div>
                 
          
                </div>
    </div>
   
  )
}

export default Phonecat