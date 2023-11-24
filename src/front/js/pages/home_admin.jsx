import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Products } from "./products.jsx";
import { Categorias } from "./categorias.jsx";
import { Restaurantes } from "./restaurantes.jsx";
import { All_ordenes } from "./all_ordenes.jsx";

export const Home_admin = () => {
    const { store, actions } = useContext(Context)

    return (
        <div className="container" style={{width:"100%" , height:"100%"}}>
        {store.selectOpcion === 1 ? 
            <Products/>
        : null}
        {store.selectOpcion === 2 ? 
            <Categorias/>
        : null}
        {store.selectOpcion === 3 ? 
            <Restaurantes/>
        : null}
        {store.selectOpcion === 4 ? 
            <All_ordenes/>
        : null}
        {store.selectOpcion === 5 ? 
            <Products/>
        : null}
        </div>
    )
}