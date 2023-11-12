import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate } from "react-router-dom";

export const Restaurantes = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getRestaurants();
  }, []);

  return (
    <>
    { store.auth == false ? <Navigate to="/"/> :
      <div className="container">
        <ul>
          {store.restaurants.map((item) => (
            <li key={item.id}>
              <b> {item.id} {item.name} {item.image}  </b>
              
              <Link to={`/modificar_restaurantes/${item.id}`}>
                <button>Modificar</button>
              </Link>
            </li>
          ))}
        </ul>

        <Link to="/crear_restaurantes">
          <button>Crear</button>
        </Link>
      </div>
    }
    </>
  );
};