import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Products = () => {
  const { store, actions, setStore } = useContext(Context);

  useEffect(() => {
    fetch("https://vigilant-carnival-wjprpwg79p7h54g-3001.app.github.dev/api/products", {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStore({ products: data });
      });
  }, []); // Agregué un arreglo vacío como segundo argumento para que el efecto se ejecute solo una vez al cargar el componente.

  return (
    <div>
      <ul>
        {store.products.map((item, index) => (
          <li key={index}>
            <b>{item.name} {item.id}</b>
          </li>
        ))}
      </ul>
      <Link to="/create">
        <button>create</button>
      </Link>
    </div>
  );
};
