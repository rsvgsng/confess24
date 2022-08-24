import React,{useEffect,useState} from "react";
import { useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import {useAlert} from "react-alert"
import Uri from "./Uri";
import Helmet from "react-helmet";

function ConfessionCreate() {
  var uri = Uri.uri ?Uri.uri :'' 

  const alert = useAlert()
  const [cat,setCat]= useState(1)
  const [content,setContent]= useState('')
  const [loading,setLoading] =useState(false)
  const [uid,setUid] =useState('')
  const isAuthenticated = !!localStorage.getItem("token");
  const [display,setDisplay] = useState('block')

  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  
  const navigate= useNavigate()
  
  useEffect(()=>{
    
    window.scrollTo(0,0)

      try {
        if(!isAuthenticated){
          window.location.href("/login")
          localStorage.removeItem("token")


        }else{
          setUid(jwt_decode(localStorage.getItem("token")))
          }
      } catch (error) {
          window.location.href="/login"
          localStorage.removeItem("token")

      }




  },[])

  async function createPost(){
    setLoading(true)
    setDisplay("none") 

    fetch(uri+'/api/new',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        user: "title",
          content: content ,
          cat:cat,
          user:uid.user,
          showGender:isChecked

      })
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.code == 200){
        alert.success("Post created!")
        
        if(sessionStorage.getItem("data")){
         sessionStorage.clear();
        }
          setTimeout(()=>{
            navigate('/post/'+data.id)
            
          },500)
        }if(data.code == 800){
          setDisplay("block") 

          alert.error(data.msg)
        }
        if(data.code == 429){
    setDisplay("block") 

          alert.error(data.msg)

        }
        if(data.code ==401){
          alert.error("Something went wrong")
          setTimeout(()=>{
            window.location.href=('/login')
            localStorage.removeItem("token")
          },1000)
      
        }
    })
    setLoading(false)

    
  }

  return (
    <div className="create-confession container fixheight">
            <Helmet>
        <title>Create a Confession</title>
      </Helmet>
      <div className="confess-container">
        <div className="ttl-create ">
          <h2>SUBMIT A CONFESSION</h2>
        </div>

        <div className="ttl-confession ">
          <h2 className="loda">Confession</h2>
          <div className="confess-area">
            <textarea onClick={()=>window.scrollTo(0,0.1)} onChange={(e)=>setContent(e.target.value)}
              name=""
              placeholder="Type what is in your brain!"
              id=""
              cols="30"
              rows="12"
            ></textarea>
          </div>

          <h2>Choose a category</h2>


          <div className="selection-cat">
            <select id="cars" onChange={(e)=>setCat(e.target.value)}>
              <option value="0" >a confusion</option>
              <option value="1" selected>a problem</option>
              <option value="2">a pain</option>
              <option value="3">an experience</option>
              <option value="4">a feeling</option>
              <option value="5" >a habit</option>
              <option value="6">others</option>
             
            </select>
          </div>



          <div className="genderReveal">
          <input
          type="checkbox"
          checked={isChecked}
          onChange={handleOnChange}
        />
        <h3>Reveal your gender ? </h3>
          </div>
       


          <div className="submit-conf">
              <h2 style={{display:display}} onClick={createPost}>{loading?"Processing...":"SUMBIT"}</h2>
          </div>




        </div>
      </div>
    </div>
  );
}

export default ConfessionCreate;
