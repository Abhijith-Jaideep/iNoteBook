import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

 

    const [credentials, setcredentials] = useState({email: '',password: ''})
    const navigate = useNavigate()

    const onSubmit= async (e)=>{
        e.preventDefault()
        const response= await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(credentials)
        }
        )
        const json = await response.json()
        if(json.success){
            localStorage.setItem("token",json.userdetails)
            navigate("/")
        }
        else{
            console.log("login failed")
        }
    }

    const onChange=(e)=>{
        setcredentials({...credentials, [e.target.name]:e.target.value})
    }

    return (
        <div className='my-5'>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email"name="email" onChange={onChange} className="form-control" id="email" aria-describedby="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" onChange={onChange} className="form-control" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login