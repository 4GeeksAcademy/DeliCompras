import React, { useState , useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

export const Admin_login = () => {
    const { store , actions } = useContext( Context );
 
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [redirect, setRedirect] = useState(false)
    const [home , setHome] = useState(false)
    
    function loguearAdmin(e) {
        e.preventDefault();
        actions.postAdmin(email, password);
    
        if (store.auth) {
            var miModal = new bootstrap.Modal(document.getElementById('exampleModal'));
            miModal.hide();
        }
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
                            <label htmlFor="inputPassword1" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="inputPassword1" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        {store.errorLogin ? 
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                                </svg>
                                Contraseña y/o Usuario Incorrectos
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=> actions.setErrorLogin(false)}></button>
                            </div> 
                        : null }
                        <div>
                            <button className="btn btn-success" type="submit" style={{borderRadius:"8px" ,backgroundColor:"#0aad0a"}}>Login</button>
                            { home && store.auth ? <Navigate to="/home_user" /> : null}
                        </div>
                    </form>
                </div>
                <div className="modal-footer border-0 justify-content-center">
                    Aun no tienes cuenta? 
                    <div data-bs-dismiss="modal" aria-label="Close" style={{color:"#0aad0a", textDecoration: "none"}}>
                        <b onClick={() => setRedirect(true)}>Registrate</b>
                        {redirect ? <Navigate to="/crear_admin" /> : null}
                    </div>
                </div>
            </div>
        </form>
    )
}