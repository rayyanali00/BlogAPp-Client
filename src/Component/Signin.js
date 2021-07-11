import React,{useState} from 'react'
import axios from 'axios'
import SignupImg from '../Image/blog-pic.png'
import {Link} from 'react-router-dom'
import Alert from '../Component/Alert';
import Cookies from 'universal-cookie';


const Signin = () =>{
    const cookies = new Cookies();
    const [credentials, setCredentials] = useState({
        email:"",
        password:""
    })
    const [errorMsg, setErrorMsg] = useState({
        isError:false,
        message:""
    });


    const onChangeHandler = (e) =>{
        setCredentials({
            ...credentials,
            [e.target.id]:e.target.value
        })
    }

    

    const submitHandler = (e) =>{
        e.preventDefault();
        const postData = {
            email:credentials.email,
            password:credentials.password
        }
        axios.post('https://ublog-app.herokuapp.com/user/signin', postData)
        .then((resp)=>{
            if(resp.data.err){
                setErrorMsg({
                    isError:true,
                    message:resp.data.err
                })
            }
            else{
                localStorage.setItem("accessToken",resp.data.token)
                // cookies.set("accessToken",resp.data.token)
                window.location.href='/blogs'
            }
        })
    }

    let displayError;
    if(errorMsg.isError){
        displayError = <Alert errorMsg={errorMsg.message}/>
    }

    return(
        <div className="container mt-5">
        <div className="row">
<div className="col-lg-4">
    
</div>
<div className="col-lg-4 signup-form mt-5">
{displayError}
<div className="text-center">
                <img src={SignupImg} className="signupimg"/>
                </div>    <hr></hr>
<form onSubmit={submitHandler} className="mt-3">

<div className="form-group text-center">
<label><i class='fas fa-envelope mb-2' style={{fontSize:2+'em', color:'black'}}></i></label>
<input type="email" name="email" id="email" className="form-control"  onChange={onChangeHandler} placeholder="Enter your email address" required></input>
</div>
<div className="form-group text-center mt-4">
<label><i class='fas fa-lock-open mb-2' style={{fontSize:2+'em', color:'black'}}></i></label>

<input type="password" name="password" id="password" className="form-control"  placeholder="Enter your password" onChange={onChangeHandler} required></input>
</div>
<div className="text-center">
<button type="submit" className="btn btn-outline-dark my-4">Signin <i class="fas fa-sign-in-alt"></i></button>
</div>
</form>
<div className="text-center">
<Link to="/signup" className="text-center">Not registered?</Link>
</div>
</div>
</div>
</div>
    )
}
export default Signin;