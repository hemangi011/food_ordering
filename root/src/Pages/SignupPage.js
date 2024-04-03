import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    let [address, setAddress] = useState("");
    let navigate = useNavigate()
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}))
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        if (!response.ok) {
            alert('Failed to create user. Please check your credentials.');
            return;
        }
        const json = await response.json()
        console.log(json);
        if (!json.success) {
            alert('Enter Valid Credntials');
        }
        if (json.success) {
            //save the auth toke to local storage and redirect
            localStorage.setItem('token', json.authToken)
            navigate("/login")

        }

    }
    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <>
            <div className="mb-3 text-center" style={{ "background-color": "orange", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className='container' style={{ "background-color": "white"}}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlfor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlfor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlfor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={onChange} />
                            <div id="passwordhelp" className="form-text">Password should be more than 5 characters long</div>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ "background-color": "orange"}}>Submit</button>
                        <Link to="/login" className='m-3 btn btn-danger' style={{ "background-color": "orange"}}>Already a user</Link>
                    </form>
                </div>
            </div>
        </>
    )
}
