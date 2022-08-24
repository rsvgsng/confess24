import React,{useState,useEffect} from 'react'

function Geda() {



const [data,setData ] = useState()

function refresh(){

}
useEffect(() => {
   refresh()
  fetch('https://jsonplaceholder.typicode.com/todos/1')

  .then(response => response.json())
  .then(e => 
    { 
      setData(e)
    })
   
      }, [])
      



  return (
    <div>

       <button onClick={()=>refresh}></button> 

    </div>
  )






}



export default Geda
