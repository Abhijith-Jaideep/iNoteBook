import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

  const navigate = useNavigate()
  
  const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""})

  const onSubmit = async  (e)=>{
    e.preventDefault()
    if(credentials.cpassword!==credentials.password){
      alert("passwords dont match")
    }
    else{
      const response = await fetch("http://localhost:5000/api/auth/createUser",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(credentials)
      })

      console.log(await response.json())
      navigate("/")
    }
  }

  const onChange  = (e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value})
  }
  
  return (
    <form className="my-5" onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" name="name" onChange={onChange} className="form-control" id="name" aria-describedby="name" minLength={3} />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" name="email" onChange={onChange} className="form-control" id="email" />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" name="password" onChange={onChange} className="form-control" id="password"  minLength={8}/>
      </div>

      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="cpassword" name="cpassword" onChange={onChange} className="form-control" id="cpassword" />
      </div>

      <button type="submit" className="btn btn-dark">Signup</button>
    </form>
  )
}

export default Signup