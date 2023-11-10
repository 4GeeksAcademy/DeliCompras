import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Sucursales = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getSucursales();
      }, []);

      return (
        <div className="container">
              <ul>
        {store.sucursales.map((item) => (
          <li key={item.id}>
            <b>
              {item.id} {item.name} {item.direccion}
            </b>
            <Link to={`/modificar_sucursales/${item.id}`}>
              <button>Modificar</button>
            </Link>
          </li>
        ))}
              </ul>
              <Link to="/crear_sucursales">
                <button>Crear</button>
              </Link>
              
        </div>
      );
    };