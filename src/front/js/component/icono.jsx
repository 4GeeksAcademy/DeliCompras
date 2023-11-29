import React, { useContext } from "react";
import logo from "../../img/logo.png"
import { Context } from "../store/appContext";

export const Icono = () => {
    const { store, actions } = useContext(Context)

    console.log("Auth:", store.auth);
console.log("User:", store.user);

console.log("Auth type:", typeof store.auth);
console.log("User type:", typeof store.user);



    return (
        <div style={{
            position:"fixed",
            bottom:"70px",
            right:"70px",
        }}>
            <img width="60px" height="60px" src={logo} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" style={{
                padding:"10px",
                backgroundColor:"white",
                border:"5px solid #0aad0a",
                borderRadius:"50px",
                zIndex: "10"
            }}/>

            {store.carrito.length > 0 ? 
                <span className="position-relative top-0 start-0 translate-middle badge rounded-pill bg-success">
                  {store.carrito.length}
                  <span className="visually-hidden">unread messages</span>
                </span>
            : null }
        </div>
    )
}