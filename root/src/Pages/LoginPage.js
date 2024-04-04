import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}))
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    if (!response.ok) {
      alert(' Please check your credentials.');
      return;
    }
    const json = await response.json()
    console.log(json);
    if (!json.success)
      alert('Enter Valid Credntials')
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("userEmail", credentials.email);
      console.log(localStorage.getItem("authToken"))
      //navigating to dashboard page after successful login
      navigate("/dashboard");
    }

  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <>
      <div className="mb-3 text-center" style={{ "background-color": "orange", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className='container orange-background' style={{ "background-color": "white"}} >
          <form onSubmit={handleSubmit}>
            <div className="mb-3" >
              <label htmlfor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlfor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ "background-color": "orange"}}>Submit</button>
            <Link to="/createuser" className='m-3 btn btn-danger' style={{ "background-color": "orange"}} >Not a user?</Link>
          </form>
        </div>
      </div>
    </>
  )




}
