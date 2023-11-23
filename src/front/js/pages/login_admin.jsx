import React, { useState , useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

export const Admin_login = () => {
    const { store , actions } = useContext( Context );
 
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [redirect, setRedirect] = useState(false)
    const [home , setHome] = useState(false)
    
    function loguearAdmin (e) {
        e.preventDefault();
        actions.postAdmin(email,password);
        setHome(true);
    }

    return (
        <form className="container" style={{maxWidth: "375px"}}>
            <div onSubmit={loguearAdmin}>
                <div className="d-flex justify-content-between modal-header border-0">
                    <h5 className="modal-title fs-3 fw-bold" id="userModalLabel">Sign Up Admin</h5>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="inputName1" className="form-label">Name</label>
                            <input type="text" className="form-control" id="inputName1" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="inputPassword1" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div>
                            <button className="btn btn-success" type="submit" data-bs-dismiss="modal" aria-label="Close" style={{borderRadius:"8px" ,backgroundColor:"#0aad0a"}}>Login</button>
                            { home ? <Navigate to="/home_user" /> : null}
                        </div>
                    </form>
                </div>
                <div className="modal-footer border-0 justify-content-center">
                    Aun no tienes cuenta? 
                    <div data-bs-dismiss="modal" aria-label="Close" style={{color:"#0aad0a", textDecoration: "none"}}>
                        <b onClick={() => setRedirect(true)}>Registrate</b>
                        {redirect? <Navigate to="/crear_admin" /> : null}
                    </div>
                </div>
            </div>
        </form>
    )
}