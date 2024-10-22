import React from "react";
import { useState , useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../App";
import { useNavigate ,Link, useParams} from "react-router-dom";


const Edit = () =>{

    const navigate = useNavigate();
    const {id} = useParams()


    const [inputs,setInputs] = useState({title:"",body:""})
    const [error,setError] = useState(null);

    const handleChange = (event)=>{
       setInputs({...inputs,[event.target.name]:event.target.value})
    }

    const handleFormsubmit = (event) =>{
        event.preventDefault();
        let data = {title:inputs.title,body:inputs.body}
        axios.put(BASE_URL + '/api/posts/'+id , data).then(()=>{

            navigate('/')
        }).catch(()=>{
            setError('Unable to update post. Please Check the database connection.')
        })

    }

  

    const getEditPost = ()=>{
        axios.get(BASE_URL + '/api/posts/'+id+'/edit')
        .then(response => response.data)
        .then((response_data) =>{
            let post = response_data.data
            setInputs({title:post.title,body:post.body})
        })
    }

    useEffect(()=>{
        getEditPost()
    },[])


    return (
        <div className="container">
        <h3>Edit Post</h3>
        <Link to ='/'>Back</Link>
            <form action ="" onSubmit={handleFormsubmit}>
                <div class="form-group">
                    <label for="title" >Title</label>
                    <input type="text" class="form-control" id="title" name ="title" onChange={handleChange} value={inputs.title} placeholder="Enter Title" />
                </div>
                <div class="form-group">
                    <label for="body">Body</label>
                    <textarea class="form-control" id="body" name="body" row = "5" onChange={handleChange} value={inputs.body} placeholder="Enter Body"></textarea>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Update</button>
                    {error!=null?(<p class="text-danger mt-2">{error}</p>):''}
                </div>
            </form>
    </div> ) 

}

export default Edit;