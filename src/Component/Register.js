import React,{useState} from 'react';
import axios from 'axios';
import '../Style/style.css'
import {Link} from 'react-router-dom';
import SignupImg from '../Image/blog-pic.png'
import Alert from '../Component/Alert';

const Signup = () =>{

    const [credentials, setCredentials] = useState({
        email:"",
        password:"",
    })
    const [errorMessage, setErrorMessage] = useState({
        isError:false,
        message:""
    });
    let errorMsg;
    if(errorMessage.isError){
        errorMsg = <Alert errorMsg={errorMessage.message}/>
    }

    setTimeout(()=>{
        if(errorMessage.isError){
            setErrorMessage({
                ...errorMsg,
                isError:false
            })
        }
    },4000)

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
        axios.post('https://ublog-app.herokuapp.com/user/signup', postData)
        .then((resp)=>{
            console.log(resp.data)
            setErrorMessage({
                isError:true,
                message:resp.data.err
            })
            if(resp.status==200){
                window.location.href="/"
            }
        })
    }

    return(
        <div className="container mt-5">
                    <div className="row">
            <div className="col-lg-4">
                
            </div>
            <div className="col-lg-4 signup-form mt-5">
            {errorMsg}
            <div className="text-center">
                <img src={SignupImg} className="signupimg"/>
                </div>
                <hr></hr>
        <form onSubmit={submitHandler} className="mt-3">

  <div className="form-group text-center">
            <label><i class='fas fa-envelope mb-2' style={{fontSize:2+'em', color:'black'}}></i></label>
            <input type="email" name="email" id="email" className="form-control"  onChange={onChangeHandler} placeholder="Enter your email address" required></input>
  </div>
  <div className="form-group mt-4 text-center">
        <label><i class='fas fa-lock-open mb-2' style={{fontSize:2+'em', color:'black'}}></i></label>

            <input type="password" name="password" id="password" className="form-control"  placeholder="Enter your password" onChange={onChangeHandler} required></input>
            </div>
            <div className="text-center">
  <button type="submit" className="btn btn-outline-dark my-4">Signup <i class="fas fa-sign-in-alt"></i></button>
</div>
</form>
<div className="text-center">
<Link to="/">Already a member?</Link>
</div>
</div>
</div>
        </div>
    )
}
export default Signup;