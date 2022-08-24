import React from 'react'
import Skeleton ,{SkeletonTheme}from 'react-loading-skeleton'

function Notificationsk() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="white">
        
        <li style={{background:'rgb(21 3 29)'}} > <Skeleton count={2} height={26}  /> <br /><span className="dateNoti"> <Skeleton count={1} width={90} /> </span></li>

        </SkeletonTheme>
  )
}

export default Notificationsk