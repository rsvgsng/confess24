import React,{useEffect,useState} from 'react'
import { ImConfused2 } from "react-icons/im";
import { FaSadCry } from "react-icons/fa";
import { ImHeartBroken } from "react-icons/im";
import { BsFillEmojiDizzyFill } from "react-icons/bs";
import { BsEmojiWinkFill } from "react-icons/bs";
import { BsFillEmojiHeartEyesFill } from "react-icons/bs";
import { BsFillEmojiSmileUpsideDownFill } from "react-icons/bs";
import moment from 'moment'
import Uri from "./Uri";
import { useParams } from 'react-router-dom';

function PostContentCard(data) {
     
     let { id } = useParams();
     var uri = Uri.uri ?Uri.uri :'' 
     const datadata = data.content[0]
     const content = data.content[0]    
    const [loading,setLoading] = useState(false)

     
     async function getMeta(){
        setLoading(true)
          await fetch(uri+'/api/postmeta/'+id,{
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              }
      
          })
      
              .then(res=>res.json())
              .then(pussy=>{
                  if(pussy.length>0){
                      setMeta(pussy[0])
                  }
              })
              setLoading(false)
      }
      
      const [meta,setMeta] = useState()


useEffect(() => {
     getMeta()
}, [])






     function kFormatter(num) {
          return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
      }
          
       
        

  
    var emo = [<ImConfused2/>,<FaSadCry/>,<ImHeartBroken/>,<BsFillEmojiDizzyFill/>,<BsEmojiWinkFill/>,<BsFillEmojiHeartEyesFill/>,<BsFillEmojiSmileUpsideDownFill/>]
  return (
    <div className='post-content-card'>
            <div className="cat-content-card">
                  {datadata.catid? emo[datadata.catid]:emo[0]}  <h2> {datadata?.cat?datadata?.cat:'Loading'}</h2>
            </div>


                <div className="content-p-card">
                        <p>
        


                         {
                              content?.gender===false?
                             null
                              : <>
                              <b style={{fontWeight:800}}>{content?.gender } ,</b>  
                              <br/>
                              </>
                         }

                             {datadata.content}
                              </p>
                </div>

            <div className="meta-content-card">
                  <p>
                       {meta?'Anonymous':'loading...'}

                  </p>
            <p>
                 { meta?.createdOn?moment(meta?.createdOn).startOf('minutes').fromNow() :'loading.... '} 
                  
                          </p>
            <p>

                       {meta?.views>=0?kFormatter(meta?.views)+' views':loading?'loading....':'0 views'} 
            </p>

                    </div>
            </div>


  )
}

export default PostContentCard