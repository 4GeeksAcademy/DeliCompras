import React, { useState , useContext } from "react";
import { Context } from "../store/appContext";

export const User_registration = () => {
    const { store , actions } = useContext( Context );

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    return (
       

        <form className="container" style={{maxWidth: "375px"}}>
            <div onSubmit={loguearAdmin}>
                <div className="d-flex justify-content-between modal-header border-0">
                    <h5 className="modal-title fs-3 fw-bold" id="userModalLabel">Sign Up Admin</h5>
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
                        <button className="btn btn-primary" onClick={(e) => {e.preventDefault(); actions.postRegister(email,password)}}>Register</button>
                        </div>
                    </form>
                </div>
                <div className="modal-footer border-0 justify-content-center">
                    Aun no tienes cuenta? 
                    <div data-bs-dismiss="modal" aria-label="Close" style={{color:"#0aad0a", textDecoration: "none"}}>
                        <b onClick={() => setRedirect(true)}>Registrate</b>
                        {redirect? <Navigate to="/user_registration" /> : null}
                    </div>
                </div>
            </div>
        </form>
    )
}