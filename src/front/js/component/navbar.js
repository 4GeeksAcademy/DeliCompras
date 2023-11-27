import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { User_login } from "../pages/user_login.jsx";
import logo from "../../img/logo.png"
import logo2 from "../../img/logo2.png"
import logout from "../../img/logout.png"
import { Carrito } from "./carrito.jsx";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    store.auth ? actions.getCart() : null;
  },[])

  if (store.user == "admin") {
    return (
      <div className="container border-bottom" style={{ 
        maxWidth : "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent:"center",
        alignItems: "center"
      }}>
        <header className="d-flex justify-content-between py-1" style={{ minWidth : "85%"}}>
          <Link to="/">
            <img src={logo} id="logo"/>
            <img src={logo2} height={"70"} id="logo2"/>
          </Link>
  
          <div className="d-flex justify-content-evenly align-items-center" id="lado" style={{ maxWidth : "130px"}}>
            <div>
            { !store.auth ?
              <div>
                <svg data-bs-toggle="modal" data-bs-target="#exampleModal" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="feather feather-user" color="#5c6c75">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                  <div className="modal-dialog">
                    <div className="modal-content" style={{borderRadius:"12px"}}>
                      <div className="modal-body">
                        <User_login/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            :
              <div>
                <div>{store.name}</div>
                <img src={logout} width="20px" height="20px" color="#5c6c75" onClick={
                  async() => {
                    await actions.logout();
                }}/>
              </div>
            }
            </div>
          </div>
        </header>
      </div> 
    );
  }

    return (
      <div className="container border-bottom" style={{ 
        maxWidth : "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent:"center",
        alignItems: "center"
      }}>
        <header className="d-flex justify-content-between py-1" style={{ minWidth : "85%"}}>
          <Link to="/">
            <img src={logo} id="logo"/>
            <img src={logo2} height={"70"} id="logo2"/>
          </Link>
  
          <div className="d-flex justify-content-evenly align-items-center" id="lado" style={{ maxWidth : "130px"}}>
            <div>
            { !store.auth ?
              <div>
                <svg data-bs-toggle="modal" data-bs-target="#exampleModal" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="feather feather-user" color="#5c6c75">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                  <div className="modal-dialog">
                    <div className="modal-content" style={{borderRadius:"12px"}}>
                      <div className="modal-body">
                        <User_login/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            :
              <img src={logout} width="20px" height="20px" color="#5c6c75" onClick={
                async() => {
                  await actions.logout();
              }}/>
            }
            </div>
  
            <div>
              <svg data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag" style={{color:"#5c6c75"}}>
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              
              {store.carrito.length > 0 ? 
                <span className="position-relative top-0 start-0 translate-middle badge rounded-pill bg-success">
                  {store.carrito.length}
                  <span className="visually-hidden">unread messages</span>
                </span>
              : null }
          
              <Carrito/>
            </div>
          </div>
        </header>
  
        <header className="d-flex justify-content-between py-3" style={{ minWidth : "85%"}}>
          <ul className="nav">
            <li className="nav-item">
              <div className="dropdown">
                <button className="btn btn-success d-flex justify-content-around align-items-center" data-bs-toggle="dropdown" style={{minWidth: "145px", minHeight:"42px", borderRadius:"8px" ,backgroundColor:"#0aad0a"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid-1x2" viewBox="0 0 16 16">
                    <path d="M6 1H1v14h5V1zm9 0h-5v5h5V1zm0 9v5h-5v-5h5zM0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm1 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1h-5z"/>
                  </svg>
                  <b>Categorias</b>
                </button>
                <ul className="dropdown-menu" style={{padding: "8px"}}> 
                  {store.categories.map((item) => (
                    <li key={item.id} style={{padding:"2px 12px"}}>
                      <Link to={`/lista_por_categorias/${item.id}`} style={{textDecoration:"none",color:"#5c6c75"}}>
                        <b>{item.name}</b>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li><Link to="/" style={{textDecoration: "none"}}><b className="nav-link">Home</b></Link></li>
            <li><Link to="/product2" style={{textDecoration: "none"}}><b className="nav-link">Productos</b></Link></li>
            
            {store.auth ? 
              <li><Link to="/sucursales" style={{textDecoration: "none"}}><b className="nav-link">Sucursales</b></Link></li>
            : null }

            {store.auth ? 
              <li><Link to="/ordenes" style={{textDecoration: "none"}}><b className="nav-link">Mis Ordenes</b></Link></li>
            : null }

            <li><Link to="/" style={{textDecoration: "none"}}><b className="nav-link">Contactenos</b></Link></li>
          </ul>
        </header>
      </div> 
    );
};