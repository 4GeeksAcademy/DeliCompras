import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate, useParams } from "react-router-dom";

export const Products_Categorias = () => {
  const { store, actions } = useContext(Context);
  const { id_cat } = useParams();

  useEffect(() => {
    actions.getList();
  }, []);

  return (
    <>
    { !store.auth ? <Navigate to="/"/> :
      <div>
        <ul>
          {store.products.filter(producto => producto.id_category == id_cat).map((item) => (
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