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
    <div>
      <ul>
        {store.products.filter(producto => producto.id_category == id_cat).map((item) => (
          <li key={item.id}>
            <img width="50" src={item.url_img} alt="Imagen Seleccionada" />
            <b>
              {item.id} {item.name} {item.description} {item.price} {item.amount}
            </b>
          </li>
        ))}
      </ul>
    </div>
  );
};