import React,{useEffect, useState} from 'react'
import { ImConfused2 } from "react-icons/im";
import { FaSadCry } from "react-icons/fa";
import { ImHeartBroken } from "react-icons/im";
import { BsFillEmojiDizzyFill } from "react-icons/bs";
import { BsEmojiWinkFill } from "react-icons/bs";
import { BsFillEmojiHeartEyesFill } from "react-icons/bs";
import { BsFillEmojiSmileUpsideDownFill } from "react-icons/bs";
import { Link, useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import Uri from "./Uri";

import Cards from './Cards';
import HomeModel from './Skeletons/HomeModel'
function Category() {

    let { id } = useParams();

// infinite 

const [items,setItems] = useState([])
const [page,setPage] =useState(1)
const [hasmore,setHasmore] =useState(true)




    async function fetchData(){
      
        await fetch(uri+`/api/category/${id}?page=${page}&limit=8`)
        .then(res=>res.json())
          .then(data=>
            {
              if(data.length>0){
                setItems([...items,...data] )
         
              }
              if(data.length===0){
                setHasmore(false)
              }
                setPage(page+1)
            }
            )
        } 
      



useEffect(()=>{
   
    fetchCat()
    setPage(page+1)
    window.scrollTo(0,0.1)
},[])


var uri = Uri.uri ?Uri.uri :'' 

    async function fetchCat(){
    
        await fetch(uri+`/api/category/${id}?page=${page}&limit=8`)
        .then(res=>res.json())
        .then(data=>{
            if(data.length>0){
                setItems(data)
            }

            if(data.code ===404){
                hasmore(false)
            }

    
        })
    }
    
    
    var emo = [<ImConfused2/>,<FaSadCry/>,<ImHeartBroken/>,<BsFillEmojiDizzyFill/>,<BsEmojiWinkFill/>,<BsFillEmojiHeartEyesFill/>,<BsFillEmojiSmileUpsideDownFill/>]
    var cats = ['a confusion','a problem','a pain','an experience','a feeling','a habit','other']
  return (
    <div className='container fixheight'>

        <div className="category">
                    <h2><span>{emo[id.slice(4)]}</span> {cats[id.slice(4)]}</h2>
        </div>


    <div className="row">




    <InfiniteScroll
  dataLength={items.length} 
  next={fetchData}
  className={'row oh'}
  hasMore={hasmore}
  loader={<><HomeModel/><HomeModel/></>}

  
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>No more confessons found :)</b>
    </p>
  }
>


{
            items?.length>0?
          
            items.map(e=>{
              return(
        <div className="col-xl-3 col-lg-4 col-md-6 col-xs-4" key={e.id}>
         
                      <Link  to ={'/post/'+e.id}>

                <Cards cat={e.cat} views={e.views} date={e.createdOn}   content ={e.content} created = {e.createdOn} comments={e.comments}/>
                      </Link>
                      </div>

              )
            })
          
      
            
            
            
            
            
            :(
            <>
            <HomeModel/>
            <HomeModel/>
            <HomeModel/>
            <HomeModel/>
            <HomeModel/>
            <HomeModel/>
            <HomeModel/>
            <HomeModel/>
            <HomeModel/>
            <HomeModel/>
            </>
            
            )
      }



</InfiniteScroll>





    </div>
    </div>
  )
}



export default Category

function Nopost(e){
    return(
      <div  style={{textAlign:'center',marginBottom:'100px'}} className="nopost row">
       {e.msg} 
      </div>
    )
  }