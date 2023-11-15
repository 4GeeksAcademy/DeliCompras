import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link , Navigate } from "react-router-dom";

export const Categorias_user = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCategories();
  }, []);

  return (
    <>
    { !store.auth ? <Navigate to="/"/> :
      <div className="container">
        <ul>
          {store.categories.map((item) => (
            <li key={item.id}>
              <b> {item.id} {item.name} </b>
              <img width="50" src={item.url} alt="Imagen Seleccionada" />
            </li>
          ))}
        </ul>
      </div>
    }
    </>
  );
};