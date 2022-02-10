 import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
 import axios from 'axios';
 import { useNavigate } from 'react-router-dom';
import  '../styles/login.css'
import '../styles/navbar.css'



const Login = () => {

    const { register, handleSubmit } = useForm();
     const [ loginError, setLoginError ] = useState("");
     const navigate = useNavigate();

    const submit = data => {
        console.log(data)
         axios.post('https://ecommerce-exercise-backend.herokuapp.com/login/', data)
         .then(res => {
                 localStorage.setItem("token", res.data.access);
                 navigate("/shop");
             })
             .catch(() => setLoginError("Credenciales incorrectas"));
    }

    return (
        <div className="container-login">
            <h1 className="login">Bienvenido</h1>
            <form className="form-login" action="" onSubmit={handleSubmit(submit)}>
                <div>
                    <p>Por favor, ingrese su correo y contraseña.</p>
                    <label  htmlFor="email">Email</label>
                    <input placeholder="E-mail" 
                        {...register("email")}
                        type="email" 
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <input placeholder="Contraseña"
                        type="password" 
                        {...register("password")}
                        required
                    />
                </div>
                {loginError}
                <div className="input-container">
                <button>Log In</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
