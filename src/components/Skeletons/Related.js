import React from 'react'
import Skeleton ,{SkeletonTheme}from 'react-loading-skeleton'

function Related() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="white">
    <div className='related-card'>
    <div className="cat-rel">
        <p> <Skeleton count={1} width={100}  /></p>
    </div>
    <div className="content-rel">
        <p>
        <Skeleton style={{marginTop:'8px',height:'20px'}} count={2} />
        </p>
    </div>
</div>
       
</SkeletonTheme>
  )
}

export default Related