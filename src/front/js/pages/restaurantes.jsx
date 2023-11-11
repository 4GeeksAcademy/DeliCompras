import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Restaurantes = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getRestaurants();
      }, []);

      return (
        <div className="container">
              <ul>
        {store.restaurants.map((item) => (
          <li key={item.id}>
            <b>
              {item.id} {item.name} {item.image}
            </b>
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
      );
    };
