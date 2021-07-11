import React,{Component,useState,useEffect, createContext} from 'react';
import axios from 'axios'
import {NavLink, Link} from 'react-router-dom';
import moment from 'moment'
import '../Style/style.css';
import Cookies from 'universal-cookie';



const BlogList = (props) => {
    const cookies = new Cookies();
    const [blogs, setBlogs] = useState([]);
    const [loader, setLoader] = useState(true);
    const [errorMsg, setErrorMsg] = useState({
      isError:false,
      message:""
    })
    const [userEmail, setUserEmail] = useState("");
    let showSpinner;
    if(loader){
        showSpinner = <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }

    useEffect(()=>{
            axios.get(`https://ublog-app.herokuapp.com/blog`,{
              headers:{
                "accessToken":localStorage.getItem("accessToken")
              }
                        })
            .then((res)=>{
              if(res.data.err){
                setErrorMsg({
                  isError:true,
                  message:"User Not Logged in, please login to see posts"
                })
                setLoader(false)
                console.log("afsad")
              }
              else{
                setUserEmail(res.data.email)
                setBlogs(res.data.data)
                setLoader(false)
                console.log(loader)
              }
            })
    
    }, [])
    console.log(errorMsg)
    let displayMsg;
    if(errorMsg.isError){
      displayMsg = <h1 className="text-danger">{errorMsg.message}</h1>
    }

    const deleteHandler = (id) =>
    {
        axios.delete(`https://ublog-app.herokuapp.com/blog/${id}`)
        .then((res)=>{
            console.log("Blog Deleted")
        })
        .catch(err => console.log(err))
        let deleteItem = blogs.filter((el)=>{
            return el._id!==id;
         })
        setBlogs(deleteItem)
    }

    let renderBlogs;
    if(blogs.length>=1){
        renderBlogs = blogs.map((i)=>{
            let conToDate = moment(i.createdAt);
            conToDate = conToDate.format("MMM Do");
            console.log(conToDate)
            return(
                <div className="col-lg-3 mt-5" key={i._id}>
    <div className="card blog-card">
      <img src={'https://ublog-app.herokuapp.com/'+i.image} className="card-img-top" alt="blog_image" height='200'></img>
      <div className="card-body blog-card-body">
        <NavLink exact to={`/detail/${i._id}`} className="text-decoration-none blog-title">{i.title}</NavLink><br/>
        {/* <p className="card-text">{i.description}</p> */}
        {/* <p className="card-text mt-3"><span style={{color:'black', fontSize:`${1.6}em`, fontWeight:'600'}}>CreatedAt: </span><span style={{color:'blue', fontSize:`${1.6}em`, fontWeight:'bold'}}>{conToDate}</span></p> */}
        <NavLink exact to={`/detail/${i._id}`} className="text-decoration-none"><button className='btn btn-dark mt-2'>Read Full Blog</button></NavLink>
        <button className="btn btn-outline-danger d-none" onClick={()=>{deleteHandler(i._id)}}>Delete</button>
        <NavLink exact to={`/update/${i._id}`}><button className="btn btn-outline-primary d-none">Edit</button></NavLink>
      </div>
      <div class="card-footer text-muted" style={{fontSize:`${0.7}em`}}>
      <div className="row">
              <div className="col-lg-6">
              Published by: {i.createdby}
              </div>
              <div className="col-lg-6">
              Published at: {conToDate}
              </div>
      </div>
  </div>
    </div>
  </div>
            )
        })
    }

    else {
        renderBlogs = <div className="col-lg-12 mt-5 text-center"><h2>No Blog Found</h2></div>
    }

    return(
    <div className='container'>
                {showSpinner}
                {/* <h1>{userEmail}</h1> */}
                {displayMsg}
                <div className="row row-cols-1 row-cols-md-2 g-4">
                {renderBlogs}
                </div>
            </div>
        )
}

export default BlogList;