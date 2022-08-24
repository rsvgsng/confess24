import React from 'react'
import Skeleton ,{SkeletonTheme}from 'react-loading-skeleton'


function PostSkeleton() {
  return (
    <div className='post-content-card mt-4'>
            <div className="cat-content-card" >
  <SkeletonTheme baseColor="#202020" highlightColor="white">
  <h2>
      
                    <Skeleton count={1} width={200} /></h2> 
  </SkeletonTheme>

            </div>


                <div className="content-p-card">
                        
                        <SkeletonTheme baseColor="#202020" highlightColor="white">
       
            <Skeleton style={{marginTop:'15px',height:'20px'}} count={8} />
       
    </SkeletonTheme>
                    


                        
                </div>

            <div className="meta-content-card">
            <SkeletonTheme baseColor="#202020" highlightColor="white">
  <h2>
      
                    <Skeleton count={1} width={148} /></h2> 
  </SkeletonTheme>

                    </div>
            </div>


  )
}

export default PostSkeleton