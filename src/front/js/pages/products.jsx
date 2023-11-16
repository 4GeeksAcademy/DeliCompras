import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate } from "react-router-dom";

export const Products = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getList();
  }, []);

  return (
    <>
    { !store.auth ? <Navigate to="/"/> :
      <div>
        <ul>
          {store.products.map((item) => (
            <li key={item.id}>
              <img width="50" src={item.url_img} alt="Imagen Seleccionada" />
              <b>
                {item.id} {item.name} {item.description} {item.price} {item.amount}
              </b>
              <Link to={`/modificar/${item.id}`}>
                <button>Modificar</button>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/create">
          <button>Crear</button>
        </Link>
      </div>
    }
    </>  
  );
};