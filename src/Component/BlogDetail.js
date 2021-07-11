import React,{Component,useState,useEffect} from 'react';
import axios from 'axios'
import '../Style/style.css'
import {NavLink} from 'react-router-dom'
import moment from 'moment';
import Cookies from 'universal-cookie';


const BlogDetail = (props) => {
  const cookies = new Cookies();
  let paramID = props.match.params.id;
    const [blogs, setBlogs] = useState({});
    const [loader, setLoader] = useState(true);
    let showSpinner;

    console.log(loader)
    if(loader){
        showSpinner = <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }

    useEffect(()=>{
            axios.get(`http://localhost:3001/blog/${paramID}`,{
              headers:{
                "accessToken":localStorage.getItem("accessToken")
              }
            
            })
            .then((res)=>{
                console.log(res.data)
                setBlogs(res.data)
                setLoader(false)
                console.log(loader)
            })
            .catch(err => console.log(err))
    
    }, [])


    let conToDate = moment(blogs.createdAt);
    conToDate = conToDate.format("MMM Do");
    console.log(conToDate)
    return(
    <div className='container'>
                {showSpinner}
                <div className="row row-cols-1 row-cols-md-2 g-4">
                <div className="col-lg-2"></div>
                <div className="col-lg-8 mt-5" key={blogs._id}>
    <div className="card detail-card">
      <img src={'http://localhost:3001/'+blogs.image} className="card-img-top" alt="blog_image" height='300'></img>
      <div className="card-body text-left">
        <h5 className="card-title">{blogs.title}</h5>
        <p className="card-text desc">{blogs.description}</p>
        <NavLink exact to={`/update/${blogs._id}`}><button className="btn btn-outline-primary">Edit</button></NavLink>
        {/* <p className="card-text">{conToDate}</p>
        <p className="card-text">{blogs.createdby}</p> */}
      </div>
      <div class="card-footer text-muted" style={{fontSize:`${0.9}em`}}>
      <div className="row">
              <div className="col-lg-6">
              Published by: {blogs.createdby}
              </div>
              <div className="col-lg-6">
              Published at: {conToDate}
              </div>
      </div>
  </div>
    </div>
  </div>
                </div>
            </div>
        )
}

export default BlogDetail;