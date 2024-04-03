import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import { useCart } from './ContextReducer';
import Cart from '../Pages/CartIcon';

export default function Navbar() {
    const [cartView, setCartView] = useState(false)
    localStorage.setItem('temp', "first")
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token')

        navigate("/login")
    }

    const loadCart = () => {
        setCartView(true)
    }

    const items = useCart();
    return (
        <div>
            <nav className="navbar navbar-expand-lg  bg-primary navbar-light position-sticky"
                style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>

                <div className="container-fluid">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">
                            <img src="data:image/png;base64,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" alt="" width="40" height="30" class="d-inline-block align-text-top"/>
                                Akasa Food
                        </a>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Home</Link>  {/* index.css - nav-link color white */}
                            </li>
                            {(localStorage.getItem("token")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myOrder" >My Orders</Link>  {/* index.css - nav-link color white */}
                                </li> : ""}
                        </ul>
                        {(!localStorage.getItem("token")) ?
                            <form className="d-flex">
                                <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
                            </form> :
                            <div>

                                <div className="btn bg-white text-success mx-2 " onClick={loadCart}>
                                    <Badge color="secondary" badgeContent={items.length} >
                                    </Badge>
                                    Cart
                                </div>

                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

                                <button onClick={handleLogout} className="btn bg-white text-success" >Logout</button></div>}
                    </div>
                </div>
            </nav>
        </div>

    )
}
