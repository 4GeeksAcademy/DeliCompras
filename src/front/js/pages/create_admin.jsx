import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";

export const Crear_admin = () => {
    const { store, actions } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isFormValid = email && password;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = {
                email: email,
                password: password
            };

            await actions.postRegister (user);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Email</label>
                        <input type="text" className="form-control" id="name" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    
                    <Link to="/">
                        <button disabled={!isFormValid} onClick={handleSubmit}> Registrar </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};