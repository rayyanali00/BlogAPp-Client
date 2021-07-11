import React, {useState} from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';

const CreateBlog = (props) => {
const cookies = new Cookies();
const [formData, setFormData] = useState({
    title:"",
    description:"",
    createdby:""
})
const [file, setFile] = useState('')


    const onChangeHandler = (e) =>{
        setFormData({
            ...formData,
            [e.target.id]:e.target.value
        })
    }

    const onFileChange = (e) =>{
        setFile(e.target.files[0])
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        console.log(formData)
        const fd = new FormData();
        fd.append("title", formData.title)
        fd.append("description",formData.description)
        fd.append("createdby",formData.createdby)
        fd.append("image",file)

        for(var pair of fd.entries()) {
            console.log(pair[0]+', '+pair[1]);
          }
        axios.post('http://localhost:3001/blog/createblogs', fd, {
            headers:{
              "accessToken":localStorage.getItem("accessToken")
            }
            
          })
        .then((resp)=>{
            console.log(resp)
            if (resp.status === 200) {
                console.log("REDIRECTION avec status => ", resp.status);

                window.location = "/";
            }
        })
        
        .catch(err => console.log(err))
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4 create-blog-sec">
            <form onSubmit={submitHandler} encType="multipart/form-data">
            <div className="mb-3 text-center">
  <label htmlFor="title" className="form-label">Title</label>
  <input type="text" className="form-control w-100" id="title" name="title" placeholder="Enter title..." value={formData.title} onChange={onChangeHandler} required></input>
</div>
<div className="mb-3 text-center">
<label htmlFor="description" className="form-label">Description</label>
  <textarea className="form-control" id="description" rows="6" name="description" placeholder="Enter description..." value={formData.description} onChange={onChangeHandler} required></textarea>
</div>
<div className="mb-3 text-center">
<label htmlFor="createdby" className="form-label">Created By</label>
  <input className="form-control w-100" id="createdby" name="createdby" placeholder="Enter author name..." onChange={onChangeHandler} value={formData.createdby} required></input>
</div>
<div className="mb-3 text-center">
  <label htmlFor="image" className="form-label">Upload Image</label>
  <input className="form-control w-100" type="file" id="image" name="image" onChange={onFileChange} required></input>
</div>
<div className="mb-2 text-center">
        <button type="submit" className="btn btn-primary">Create Blog</button>
</div>
            </form>
            </div>
        </div>
        </div>
    )
}

export default CreateBlog;
