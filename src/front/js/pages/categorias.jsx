import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Categorias = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getCategorias();
      }, []);

      return (
        <div className="container">
              <ul>
        {store.categorias.map((item) => (
          <li key={item.id}>
            <b>
              {item.id} {item.name} {item.image}
            </b>
            <Link to={`/modificar_categorias/${item.id}`}>
              <button>Modificar</button>
            </Link>
          </li>
        ))}
              </ul>
              <Link to="/crear">
                <button>Crear</button>
              </Link>
              
        </div>
      );
    };