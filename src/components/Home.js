import React,{useEffect,useState} from "react";
import Recent from "./Recent";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import HomeModel from "./Skeletons/HomeModel";
import InfiniteScroll from 'react-infinite-scroll-component';
import Uri from "./Uri";
import Helmet from "react-helmet";
function Home() {

  var uri = Uri.uri ?Uri.uri :'' 

  
  useEffect(() => {

    fetchRecent()
    setPage(page+1)

  }, [])



// infinite scroll section 


const [items,setItems] = useState([])
const [page,setPage] =useState(1)
const [hasmore,setHasmore] =useState(true)





 async function fetchRecent(){

     
  if(sessionStorage.getItem("data")){
    var cachedData = JSON.parse(sessionStorage.getItem("data"))
    setItems(cachedData)
  }
  
  else{
    await fetch(uri +`/api/recent?page=${page}&limit=8`)
        .then(res=>res.json())
        .then(data=>
            {
              if(data.post.length>0){

                setItems(data.post)
                sessionStorage.setItem("data",JSON.stringify(data.post))
                window.scrollTo(0,0.1)

              }
  
              if(data.code === 404){
                hasmore(false)
              }
          
          
    
            }
            
            
            )
   
  }
    
     
 
    }


    async function fetchData(){
      
      await fetch(uri +`/api/recent?page=${page}&limit=8`)
      .then(res=>res.json())
        .then(data=>
          {
            if(data.post.length>0){
              setItems([...items,...data.post] )
           
  
            }
            if(data.post.length===0){
              setHasmore(false)
            }
      setPage(page+1)
        
  
  
  
  
  
          }
          
          
          
          )
   
      } 
    
      

  return (
    
    <div className="container fixheight">
<Helmet>
<title>Confess24</title>
</Helmet>






      <div className="section-two">
        <Recent  title={'RECENT'} indicator='AiOutlineClockCircle'/>




            <div className="filter-list-section">
              <ul>
                  <Link to={'/rc'}>

                <li>MOST VIEWED </li>
                  </Link>



                  <Link to={'/mc'}>

                <li>MOST COMMENTED </li>
                </Link>
                <Link to={'/atm'}>

                <li>MOST POPULAR ALL TIME</li>



                </Link>
              </ul>
            </div>
        <div className="cards-section">

          <InfiniteScroll
  dataLength={items.length} 
  next={fetchData}
  scrollThreshold={0} 
  className={'row oh'}
  hasMore={hasmore}
  loader={<><HomeModel/><HomeModel/><HomeModel/><HomeModel/></>}
  
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
    </div>
  );
}

export default Home;

