import React from 'react'
import Skeleton ,{SkeletonTheme}from 'react-loading-skeleton'

function HomeModel() {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-xs-4 ">
    <div className='c-cards'>
        <SkeletonTheme baseColor="black"  highlightColor="white">
        <h2 className='cat-card'>
        <Skeleton style={{width:'100px'}}/>
        </h2>
        </SkeletonTheme>
        <p>
        <Skeleton count={3}/>
        </p>
        <div className="meta-card">
          
                    <ul>
                        <li>
  <SkeletonTheme baseColor="#202020" highlightColor="white">
                        <p>
                        <Skeleton style={{width:'150px',height:'20px'}}/>
                            
                            </p>
</SkeletonTheme>
                        </li>
                  
                        <li>
     
            </li>
                    </ul>
                   
             
            
                   
            
          
        </div>

    </div>
    </div>
  )
}

export default HomeModel