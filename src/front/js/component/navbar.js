import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  async function aumentar (item) {
    const updatedCart = item;
    updatedCart.cantidad++;
    await actions.set_carrito(updatedCart, item.id);
	await actions.get_carrito();
  };

  async function disminuir (item) {
    if (item.cantidad > 0) {
      const updatedCart = item;
      updatedCart.cantidad--;
      await actions.set_carrito(updatedCart, item.id);
	  await actions.get_carrito();
    }
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">....</span>
        </Link>
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Carrito
          </button>
          <ul className="dropdown-menu">
            {store.carrito.map((item, index) => (
              <li key={index}>
                <a className="dropdown-item" href="#">
                  <img width="50" src={item.product_info.img} alt="Img" />
                  {item.product_info.name}
                  {item.product_info.price}
                  <div>
                    <button onClick={() => aumentar(item)}>+</button>
                    {item.cantidad}
                    <button onClick={() => disminuir(item)}>-</button>
                  </div>
				  <button onClick={() => actions.delete_carrito(item.id)}>eliminar</button>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
