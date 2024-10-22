import React from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../App";
import { useNavigate ,Link} from "react-router-dom";

const Create = ()=>{

    const navigate = useNavigate();

    const [inputs,setInputs] = useState({title:"",body:""})
    const [error,setError] = useState(null);

    const handleChange = (event)=>{
       setInputs({...inputs,[event.target.name]:event.target.value})
    }

    const handleFormsubmit = (event) =>{
        event.preventDefault();
        let data = {title:inputs.title,body:inputs.body}
        axios.post(BASE_URL + '/api/posts' , data).then(()=>{

            navigate('/')
        }).catch(()=>{
            setError('Unable to create post. Please Check the database connection.')
        })

    }
    return (
    <div className="container">
    <h3>Create Post</h3>
    <Link to ='/'>Back</Link>
        <form action ="" onSubmit={handleFormsubmit}>
               <div class="form-group">
                   <label for="title" >Title</label>
                   <input type="text" class="form-control" id="title" name ="title" onChange={handleChange} placeholder="Enter Title" />
               </div>
               <div class="form-group">
                   <label for="body">Body</label>
                   <textarea class="form-control" id="body" name="body" row = "5" onChange={handleChange} placeholder="Enter Body"></textarea>
               </div>
               <div class="form-group">
                  <button type="submit" class="btn btn-primary">Submit</button>
                  {error!=null?(<p class="text-danger mt-2">{error}</p>):''}
               </div>
           </form>
   </div> ) 
}

export default Create;