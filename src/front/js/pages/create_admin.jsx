import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";

export const Crear_admin = () => {
    const { store, actions } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false)

    const isFormValid = email && password;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = {
                email: email,
                password: password
            };

            await actions.postRegister (user);
            setCreate(true)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form className="container" style={{maxWidth: "375px"}}>
            <div onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between modal-header border-0">
                    <h5 className="modal-title fs-3 fw-bold" id="userModalLabel">Registrate Admin</h5>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="inputEmail1" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail1" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="inputPassword1" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div>
                            <button className="btn btn-primary" onClick={(e) => {e.preventDefault(); actions.postRegister(email,password)}} style={{backgroundColor:"#0aad0a", textDecoration: "none", borderRadius:"8px"}}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </form>
    );
};