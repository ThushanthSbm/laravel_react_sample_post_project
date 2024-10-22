import React, { useState , useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../App";

const List = ()=>{

    const [posts,setPosts] = useState([])


    const loadPosts = ()=>{
         axios.get(BASE_URL + '/api/posts')
         .then(response => response.data)
         .then((response_data) =>{
             let posts = response_data.data
             setPosts(posts)
         })
    }

    const handleDelete = (id)=>{
        axios.delete(BASE_URL + '/api/posts/' +id)
       .then(()=>{
        loadPosts();
       })
    }


    useEffect(()=>{
        loadPosts()
    },[])

    return (
            <div>
                    <div align='right'>
                        <Link to='/create' class='btn btn-primary mb-2'>create</Link>
                    </div>
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                posts.map((post,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{post.id}</td>
                                            <td>{post.title}</td>
                                            <td>{post.body}</td>
                                            <td>
                                                <Link to={'edit/'+post.id} class='btn btn-warning'>Edit</Link> {'\u00A0'}{'\u00A0'}
                                                <a onClick={()=>handleDelete(post.id)} class='btn btn-danger'>Delete</a>
                                            </td>
                                       </tr>
                                    )
                                })
                            }
                           
                        </tbody>
                        </table>
            </div>
    )
}

export default List;