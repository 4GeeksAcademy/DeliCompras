import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    store.auth ? actions.getCart() : null;
  },[])

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div>
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>

        <div>
          {store.auth == false ? null : 
            <button className="btn btn-primary" onClick={()=> actions.logout()}>Logout</button>
          }
        </div>
        
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          > Carrito </button>

          <ul className="dropdown-menu">
            {store.carrito.map((item, index) => (
              <li key={index}>
                <a className="dropdown-item" href="#">
                  <img width="50" src={item.product_info.url_img} alt="Img" />
                  {item.product_info.name}
                  {item.product_info.price}
                  <div>
                    <button onClick={() => aumentar(item)}>+</button>
                    {item.amount}
                    <button onClick={() => disminuir(item)}>-</button>
                  </div>
				          <button onClick={async () => {await actions.deleteCart(item.id);await actions.getCart}}>eliminar</button>
                </a>
              </li>
            ))}
            <Link to="/resumen">
              <button> Resumen </button>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};