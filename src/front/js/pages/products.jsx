import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Products = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.actualizarlist();
  }, []);

  return (
    <div>
      <ul>
        {store.products.map((item) => (
          <li key={item.id}>
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
  );
};
