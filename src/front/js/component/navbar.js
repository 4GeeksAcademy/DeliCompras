import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { User_login } from "../pages/user_login.jsx";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    store.auth ? actions.getCart() : null;
  },[])

  return (
    <div className="container border-bottom">
      <header className="d-flex justify-content-center py-3 mb-4">
        <Link to="/">
          <img src="https://firebasestorage.googleapis.com/v0/b/proyect-6a0a9.appspot.com/o/img%2Fcarrito.png?alt=media&token=07182e9f-a2a2-495e-a2e0-596764c7ea1a" id="logo"/>
        </Link>
      </header>
      <header className="d-flex justify-content-between py-3">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <div className="dropdown">
              <button className="btn btn-success" data-bs-toggle="dropdown">
                Categorias
              </button>
              <ul className="dropdown-menu">
                {store.categories.map((item) => (
                  <Link to={`/lista_por_categorias/${item.id}`}>
                    <li key={item.id}>
                      <b> {item.id} {item.name} </b>
                      <img width="50" src={item.url_img} alt="Imagen Seleccionada" />
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </li>
          <li className="nav-item"><Link to="/"><div className="nav-link">Home</div></Link></li>
          <li className="nav-item"><Link to="/products_user"><div className="nav-link">Productos</div></Link></li>
          <li className="nav-item"><Link to="/sucursales"><div className="nav-link">Sucursales</div></Link></li>
          <li className="nav-item"><Link to="/ordenes"><div className="nav-link">Mis Ordenes</div></Link></li>
          <li className="nav-item"><Link to="/"><div className="nav-link">Contactenos</div></Link></li>
        </ul>
        <div className="d-flex justify-content-evenly align-items-center" id="lado">
          <div>
            {store.auth == false ? null : 
              <button className="btn btn-primary" onClick={() => actions.logout()}>Logout</button>
            }
          </div>

          <div>
            <svg data-bs-toggle="modal" data-bs-target="#exampleModal" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="feather feather-user">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <User_login/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <svg data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>

          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul>
                {store.carrito.map((item, index) => (
                  <li key={index}>
                    <a>
                      <img width="50" src={item.product_info.url_img} alt="Img" />
                      {item.product_info.name}
                      {item.product_info.price}
                      <div>
                        <button onClick={() => aumentar(item)}>+</button>
                        {item.amount}
                        <button onClick={() => disminuir(item)}>-</button>
                      </div>
                      <button onClick={async () => {await actions.deleteCart(item.id)}}>eliminar</button>
                    </a>
                  </li>
                ))}
                <Link to="/resumen">
                  <button> Resumen </button>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};