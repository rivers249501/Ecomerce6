import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const NavBar = () => {

    const navigate = useNavigate();
    const logOut = () => {
    localStorage.setItem("token", "");
    navigate("/login");
};

return (
    <div className="container-header" >

        <nav className="container-header">
        <button className="container-btn" onClick={logOut}>Log out</button>
            <Link className="container-link" to="/">Conocenos</Link>
            <Link className="container-link" to="/shop">Productos</Link>
            <Link className="container-link" to="/cart">Cart</Link>

        </nav>

    </div>
  )
};

export default NavBar;


