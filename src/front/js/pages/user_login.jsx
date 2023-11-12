import React, { useState , useContext } from "react";
import { Context } from "../store/appContext";

export const User_login = () => {
    const { store , actions } = useContext( Context );

    const [name , setName] = useState("");
    const [password , setPassword] = useState("");

    return (
        <form>
            <div className="mb-3">
                <label htmlFor="inputName1" className="form-label">Name</label>
                <input type="text" className="form-control" id="inputName1" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="inputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="inputPassword1" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
                <button className="btn btn-primary" onClick={(e) => {e.preventDefault(); actions.postUser(name,password)}}>Login</button>
            </div>
        </form>
    )
}