import React, { useState , useContext } from "react";
import { Context } from "../store/appContext";

export const User_login = () => {
    const { store , actions } = useContext( Context );

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    return (
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
                <button className="btn btn-primary" onClick={(e) => {e.preventDefault(); actions.postUser(email,password)}}>Register</button>
            </div>
        </form>
    )
}