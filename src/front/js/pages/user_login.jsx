import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";

export const User_login = () => {
    const { store, actions } = useContext(Context);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false)

    const [email , setEmail] = useState("");
    
    useEffect(()=>{
        setRedirect(false)
    },[redirect])

    function loguearUser (e) {
        e.preventDefault();
        actions.postUser(name, password);
    }

    return (
        <div>
            <div onSubmit={loguearUser}>
                <div className="modal-header border-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16" onClick={() => setSelectedOption(null)}>
                        <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                    </svg>
                    <h5 className="modal-title fs-3 fw-bold" id="userModalLabel">Sign Up</h5>
                    <button type="button" className="btn-close m-0" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form className="needs-validation" noValidate="">
                        <div className="mb-3">
                            <label htmlFor="inputName1" className="form-label"><b>Username</b></label>
                            <input type="text" className="form-control" id="inputName1" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ingresa tu Username" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword1" className="form-label"><b>Contraseña</b></label>
                            <input type="password" className="form-control" id="inputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingresa tu Contraseña" />
                        </div>
                        <button className="btn btn-success" type="submit" data-bs-dismiss="modal" aria-label="Close" style={{borderRadius:"8px" ,backgroundColor:"#0aad0a"}}><b>Loguear</b></button>
                    </form>
                </div>
                <div className="modal-footer border-0 justify-content-center">
                    Aun no tienes cuenta? 
                    <div data-bs-dismiss="modal" aria-label="Close" style={{color:"#0aad0a", textDecoration: "none"}}>
                        <b onClick={() => setRedirect(true)}>Registrate</b>
                        {redirect? <Navigate to="/crear_restaurantes" /> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}