import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Products = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getList();
  }, []);

  return (
    <div>
      <ul>
        {store.products.map((item) => (
          <li key={item.id}>
            <b>
              {item.id} {item.name} {item.description} {item.price} {item.amount}
            </b>
            <img width="50" src={item.img} alt="Imagen Seleccionada" />
            <Link to={`/modificar/${item.id}`}>
              <button>Modificar</button>
            </Link>
            <button onClick={() => {actions.postCart(1,item.id,1);actions.getCart()}}>añadir</button>
          </li>
        ))}
      </ul>
      <Link to="/create">
        <button>Crear</button>
      </Link>
    </div>
  );
};
