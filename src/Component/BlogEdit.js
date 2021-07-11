import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';

const BlogEdit = (props) => {
    const cookies = new Cookies();
    let paramID = props.match.params.id;
    let [data, setData] = useState({
        title:"",
        description:"",
        createdby:""
    })
    const [file, setFile] = useState('')
    useEffect(()=>{
        axios.get(`https://ublog-app.herokuapp.com/blog/${paramID}`,{
            headers:{
                "accessToken":localStorage.getItem("accessToken")
              }
          })
        .then((res)=>{
            console.log(res.data)
            setData({
                title:res.data.title,
                description:res.data.description,
                createdby:res.data.createdby
            })
            setFile(res.data.image)
        })
        .catch(err => console.log(err))
    },[])

    const changeHandler = (e) =>{
        setData({
            ...data,
            [e.target.id]:e.target.value
        })
    }

    const onFileChange = (e) =>{
        // console.log(e.target.files[0].name)
        setFile(e.target.files[0])
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        console.log(file)
        let formData = new FormData();
        formData.append("title",data.title)
        formData.append("description",data.description)
        formData.append("createdby",data.createdby)
        formData.append("image",file)
        for(var pair of formData.entries()) {
            console.log(pair[0]+', '+pair[1]);
          }
        axios.post(`https://ublog-app.herokuapp.com/blog/update/${paramID}`,formData,{
            headers:{
              "accessToken":localStorage.getItem("accessToken")
            }
            // headers:{
            //     "accessToken":cookies.get("accessToken")
            //   }
          })
        .then((res)=>{
            console.log("Data Updated")
            console.log(res.data)
            window.location.href = '/'
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="container">
        <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4 mt-4 create-blog-sec">
        <form onSubmit={submitHandler} encType="multipart/form-data">
        <div className="mb-3 text-center">
<label htmlFor="title" className="form-label">Title</label>
<input type="text" className="form-control w-100" id="title" name="title" placeholder="Example input placeholder" value={data.title} onChange={changeHandler} required></input>
</div>
<div className="mb-3 text-center">
<label htmlFor="description" className="form-label">Description</label>
<textarea className="form-control" id="description" rows="6" name="description" value={data.description} onChange={changeHandler} required></textarea>
</div>
<div className="mb-3 text-center">
<label htmlFor="createdby" className="form-label">Created By</label>
<input className="form-control w-100" id="createdby" name="createdby" value={data.createdby} onChange={changeHandler} required></input>
</div>
<div className="mb-3 text-center">
<label htmlFor="image" className="form-label">Upload Image</label>
<input className="form-control w-100" type="file" id="image" name="image" onChange={onFileChange} required></input>
</div>
<div className="mb-3 text-center">
    <button type="submit" className="btn btn-primary">Update Blog</button>
</div>
        </form>
        </div>
    </div>
    </div>
    )
}

export default BlogEdit;
