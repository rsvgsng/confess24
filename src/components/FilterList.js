import React, { useEffect, useState } from "react";
import Recent from "./Recent";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import HomeModel from "./Skeletons/HomeModel";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import Uri from "./Uri";

function Home() {
  const { id } = useParams();

  var uri = Uri.uri ? Uri.uri : "";



  // infinite scroll section

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasmore] = useState(true);
var title ,indicator
useEffect(() => {
  setItems('')
  fetchRecent();

  setPage(page + 1);

}, [id]);
  async function fetchRecent() {
    await fetch(uri + `/api/${id}?page=${page}&limit=8`)
      .then((res) => res.json())
      .then((data) => {
        if (data.post.length > 0) {
          setItems(data.post);
        }

        if (data.code === 404) {
          hasmore(false);
        }
      });
  }


  if(id==='rc'){
    title = ("MOST VIEWED IN LAST 7 DAYS")
     indicator= 'FaEye'
  }


  if(id==='mc'){
    title = ("MOST COMMENTED IN LAST 7 DAYS")
     indicator= 'AiOutlineComment'
  }
  if(id==='atm'){
    title = ("MOST POPULAR ALL TIME")
     indicator= 'AiFillFire'
  }




  async function fetchData() {
    await fetch(uri + `/api/${id}?page=${page}&limit=8`)
      .then((res) => res.json())
      .then((data) => {
        if (data.post.length > 0) {
          setItems([...items, ...data.post]);
        }
        if (data.post.length === 0) {
          setHasmore(false);
        }
        setPage(page+1 );
      });
  }

  return (
    <div className="container">
      <div className="section-two">
        <Recent  indicator = {indicator} title = {title}/>
        <div className="filter-list-section">
              <ul>




            <a href="/">
<li>RECENT </li>

            </a>



      
            <a href="/atm">


<li>MOST POPULAR ALL TIME</li>



</a>
          
            <a href="/rc">


                    <li>MOST VIEWED </li>
                      </a>

          
                 

               


                      <a href="/mc">


                        <li>MOST COMMENTED </li>
                        </a>

        

              



              
              </ul>
            </div>
        <div className="cards-section">
          <InfiniteScroll
            dataLength={items.length}
            next={fetchData}
            className={"row oh"}
            hasMore={hasmore}
            loader={
              <>
                <HomeModel />
                <HomeModel />
                <HomeModel />
                <HomeModel />
              </>
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>No more confessons found :)</b>
              </p>
            }
          >
            {items?.length > 0 ? (
              items.map((e) => {
                return (
                  <div className="col-lg-3" key={e.id}>
                    <Link to={"/post/" + e.id}>
                      <Cards
                        cat={e.cat}
                        views={e.views}
                        date={e.createdOn}
                        content={e.content}
                        created={e.createdOn}
                        comments={e.comments}
                      />
                    </Link>
                  </div>
                );
              })
            ) : (
              <>
                <HomeModel />
                <HomeModel />
                <HomeModel />
                <HomeModel />
                <HomeModel />
                <HomeModel />
                <HomeModel />
                <HomeModel />
                <HomeModel />
                <HomeModel />
              </>
            )}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default Home;
